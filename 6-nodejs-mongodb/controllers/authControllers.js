const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendMail = require("../utils/email");

const signToken = (user_id) => {
  return jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // jwt tokeni oluştur
  const token = signToken(newUser._id);

  res.status(201).json({
    message: "Hesabınız başarıyla oluşturuldu",
    data: newUser,
    token: token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) Email ve şifre düzgün mü kontrol et
  if (!email || !password) {
    return next(new AppError("Lütfen mail ve şifrenizi giriniz", 401));
  }

  //2) Gönderilen emailde kullanıcı var mı kontrol et
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new AppError("Girdiğiniz mail adresine sahip bir kullanıcı yoktur", 404)
    );
  }

  //3) Şifresi doğru mu kontrol et
  // Veri tabanında saklanan hashlenmiş şifre ile kullanıcnı girdiği normal şifreyi katşılaştırır
  const isValid = await user.correctPass(password, user.password);

  if (!isValid) {
    return next(new AppError("Girdiğiniz şifre hatalı", 400));
  }

  //4) Her şey tamamsa JWT tokenini oluştur ve gönder
  const token = signToken(user.id);

  res.status(200).json({ message: "Hesaba giriş yapıldı", data: user, token });
});

// kullanıcın tokeni üzerinden token geçilriliğni doğrulayıp
// ardından geçrliyse ve rolü uygunsa route'erişime izin vericek
// aksi takdirde yetkiniz yok hatası vericek bir middleware
exports.protect = async (req, res, next) => {
  //1) tokeni al ve tokenin tanımlı geldiğinden emin ol
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    // tokenin bearer kelimesinden sonraki kısmını al
    token = token.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Bu işlem için yetkiniz yoktur", 403));
  }

  //2) Tokenin geçerliliğini doğrula
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.message === "jwt expired") {
      return next(
        new AppError("Oturmunuzun süresi doldu.Lütfen tekrar giriş yapın", 403)
      );
    } else {
      return next(new AppError("Gönderdiğiniz token geçersiz", 403));
    }
  }

  //3) Kullanıcının hesabı duruyor mu konrtol et
  const activeUser = await User.findById(decoded.id);

  if (!activeUser) {
    return next(new AppError("Kullanıcnın hesabına artık erişilemiyor.", 403));
  }

  //Todo 4) Tokeni verdikten sonra şifreseini değiştirdi mi kontrol et
  if (activeUser.controlPassDate(decoded.iat)) {
    return next(
      new AppError(
        "Yakın zamanda şifrenizi değiştirdiniz. Lütfen tekrar giriş yapın"
      )
    );
  }

  // bir sonraki aşamaya aktif kullanıcnın bilgileini aktar
  req.user = activeUser;
  next();
};

// parametre olarak gelen roldeki kullanıcıların route'a eişmesini engellleyen middleware
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // 1) kullanıcının rolü geçerli roller arasında yoksa erişimi engelle
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("Bu işlemi yapmak için yetkiniz yok (rol yetesiz)", 401)
      );
    }

    // 2) kullanıncın rolü geçerli roller arasında varsa erşime izin vericez
    next();
  };

//1) Kullanıcı şifresini unuttuysa
//a) epostasına şifre sıfırlama bağlantısı gönder
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) e-postaya göre kullanıcnın hesabına eriş
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("Bu emaile sahip bir kullanıcı bulunamadı"));
  }

  // 2) şifre sıfırlama tokeni oluştur
  const resetToken = user.createPasswordResetToken();

  // 3) veritbanına tokenin şifrelenmiş halini ve son geçerlilik tarihini kaydet
  // şifre alanını göndermediğimiz için doğrulamaları devre dışı bıraktık
  await user.save({ validateBeforeSave: false });

  //4) kullanıcının mailine tokeni link ile gönder
  try {
    const link = `http://127.0.0.1:4001/api/v1/users/reset-password/${resetToken}`;

    const html = `
     <h1>Merhaba, ${user.name}</h1>
     <p>${user.email} epostasına bağlı tourify hesabı için şifre sıfırlama bağlantısı aşağıdadır.<p>

     <p>
     <a href="${link}">${link}</a>
     10 Dakika içerisinde bu url'e yeni şifrenizle birlikte PATCH isteği atarak şifrenizi güncelleyebilirsiniz
     </p>

     <p>Eğerki bu maili siz göndermediyseniz lütfen sadece göremzde gelin.</p>
     <p>Tourify Ekibi</p>
   `;

    await sendMail({
      email: user.email,
      subject: "Şifre sıfırlama tokeni (10 dakika)",
      html,
    });
  } catch (err) {
    return next(new AppError("Mail gönderilirken bir sorun oluştu"));
  }

  // Cevap gönder
  res.status(200).json({
    message:
      "Veritabanına tokenin şifrelenmiş hali kaydedildi ve Maile tokenin normal hali gönderildi",
  });
});

//b) kullanıcnın yeni şifresini kaydet
exports.resetPassword = (req, res, next) => {
  // 1) tokenden yola çıkarak kullanıcıyı bul
  // 2) kullanıcı bulunduysa ve token tarihi geçmemişse yeni şifreyi belirle
  // 3) kullanıcının şifre değiştirme tarihini güncelle
};
