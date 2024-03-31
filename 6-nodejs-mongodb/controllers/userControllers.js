const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObj');

// Kullanıcnın kendi hesabını günclelemsini sağlar
exports.updateMe = catchAsync(async (req, res, next) => {
  //1) Şifereyi güncellemeye çalışırsa hata ver
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Şifrenizi bu route ile güncelleyemezsiniz', 400));
  }

  //2) İsteğin body kımsına güncellemesine izin verdiğimmiz değerleri al
  const filtredBody = filterObj(req.body, 'name', 'email', 'photo');

  //3) Kullanıcnın bilgilerini güncelle
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filtredBody, {
    new: true,
  });

  //3) Kullanıcın belirli bilgilerini güncelle
  res
    .status(200)
    .json({ message: 'Kullanıcı başarıyla güncellendi', user: updatedUser });
});

// Kullanıcnın kendi hesabını kapatması
exports.deleteMe = catchAsync(async (req, res, next) => {
  //1) Kulanıcının active değerini false'a çek
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    message: 'Hesap devre dışı bırakıldı',
  });
});

// Bütün kullanıcın bilgilerini al
exports.getAllUsers = (req, res) => {};

// Yeni kullanıcı oluştur
exports.createUser = (req, res) => {};

// Kullanıcının hesap bilgilerini al
exports.getUser = (req, res) => {};

// Adminin Kullanıcyı güncellemesi için
exports.updateUser = (req, res) => {};

// Adminin Kullanıcyı tamamen kaldırması için
exports.deleteUser = (req, res) => {};
