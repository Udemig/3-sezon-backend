const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");

const signToken = (user_id) => {
  return jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

exports.signup = async (req, res, next) => {
  try {
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
  } catch (err) {
    return next(new AppError("Hesap oluşturulurken bir hata oluştu", 400));
  }
};

exports.login = async (req, res, next) => {
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
};

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

  next();
};

restrictTo("admin");
restrictTo("user", "guide");
restrictTo("user", "guide", "lead-guide");

// parametre olarak gelen roldeki kullanıcıların route'a eişmesini engellleyen middleware
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // 1) kullanıcının rolü geçerli roller arasında yok mu kontrol et yoksa erişimi engelle
    // 2) kullanıncın rolü geçerli roller arasında varsa erşime izin vericez
  };
