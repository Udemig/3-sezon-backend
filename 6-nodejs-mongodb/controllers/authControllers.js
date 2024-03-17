const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signToken = (user_id) => {
  return jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });
};

exports.signup = async (req, res) => {
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
      message: 'Hesabınız başarıyla oluşturuldu',
      data: newUser,
      token: token,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Hesap oluşturulken bir sorun oluştu', err: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  //1) Email ve şifre düzgün mü kontrol et
  if (!email || !password) {
    return res.status(400).json({
      message: 'Lütfen mail ve şifrenizi giriniz',
    });
  }

  //2) Gönderilen emailde kullanıcı var mı kontrol et
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(400).json({
      message: 'Girdiğiniz mail adresinde bir kullanıcı yoktur',
    });
  }

  //3) Şifresi doğru mu kontrol et
  // Veri tabanında saklanan hashlenmiş şifre ile kullanıcnı girdiği normal şifreyi katşılaştırır
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(400).json({
      message: 'Girdiğiniz şifre yanlış',
    });
  }

  //4) Her şey tamamsa JWT tokenini oluştur ve gönder
  const token = signToken(user.id);

  res.status(200).json({ message: 'Hesaba giriş yapıldı', data: user, token });
};

// kullanıcın tokeni üzerinden token geçilriliğni doğrulayıp
// ardından geçrliyse ve rolü uygunsa route'erişime izin vericek
// aksi takdirde yetkiniz yok hatası vericek bir middleware
exports.protect = async (req, res, next) => {
  //1) tokeni al ve tokenin tanımlı geldiğinden emin ol
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    // tokenin bearer kelimesinden sonraki kısmını al
    token = token.split(' ')[1];
  }

  if (!token) {
    return next(
      res
        .status(423)
        .json({ message: 'Hizmete erişmek için tokeninizi gönderin' })
    );
  }

  //2) Tokenin geçerliliğini doğrula
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(
      res.status(423).json({ message: 'Geçersiz bir token gönderidiniz' })
    );
  }
  ///gelen cevap: { id: '65f6b0a675f7e5084df7eb96', iat: 1710672117, exp: 1718448117 }

  //Todo 3) Kullanıcının hesabı duruyor mu konrtol et

  //Todo 4) Tokeni verdikten sonra şifreseini değiştirdi mi kontrol et

  next();
};
