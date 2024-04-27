const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObj');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');

// medyayı sunucuya yüklemek için ayarları yap
// const multerStorage = multer.diskStorage({
//   // yüklenicek klasörü belirledik
//   destination: function (req, file, cb) {
//     cb(null, 'public/img/users');
//   },

//   // dosyanın ismini belirledik
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split('/')[1]; // jpg

//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// medyayı buffer veri tipinde memoryde (hafızada) tutan storage oluşturalım
const multerStorage = multer.memoryStorage();

// kullanıcı profil fotoğrafı olarak sadece resim tipinde medyaları kabul edicek filtre tanımlama
const multerFilter = (req, file, cb) => {
  // eğerki dosya tipi "image" kelimesi ile başlıyorsa
  if (file.mimetype.startsWith('image')) {
    // yüklemeye izn ver
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Lütfen profil fotoğrafı olarak resim tipinde dosya seçiniz',
        400
      ),
      false
    );
  }
};

// multer methoduna hedef klasörü verip tanımlarız
// buda geriye belirlenen klasöre medya yüklemeye yarayan method döndürür
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// dosya yükler
exports.updloadUserPhoto = upload.single('photo');

// kullanıcı 4k 30mb bir fotoğrfı profile fotoğrafı yapmaya çalışabilir.
// projeler içserinsnde profil fotoğrafları genelde 40x40 veya 80x80 boyutlarda kullanılır. ama kullanıcı fotğraf seçerken 2500x1080 gibi yüksek kalite bir fotoğrafı seçebilir ve  herhangi bir işlemden geçirmeden sunucuya bu fotoyu kaydetmek gereksiz alan kaplar. Bu yüzden yüklenicek olan bütün profil fotoğrafların çözünürlüğü projede kullanılcak maks boyuta indiricez. Bu da ort her foto için 3-10mb > 30-50kb indermek anlamına gelicek.
exports.resize = (req, res, next) => {
  // eğer dosya yoksa yeniden boyutlandırma yapma sonraki adıma geç
  if (!req.file) return next();

  // diske kaydedilecek dosya ismini olutşur
  const filename = `/user-${req.user.id}-${Date.now()}.jpeg`;

  // işlemden geçir
  sharp(req.file.buffer)
    .resize(500, 500) // boyutu belirlirle
    .toFormat('jpeg') // veri formatını belirle
    .jpeg({ quality: 30 }) // kaltiyei belirle
    .toFile(`public/img/users/${filename}`); // dosyanın kaydedileceği adresi tanımla

  // sonraki adıma geç
  next();
};

// Kullanıcnın kendi hesabını günclelemsini sağlar
exports.updateMe = catchAsync(async (req, res, next) => {
  //1) Şifereyi güncellemeye çalışırsa hata ver
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Şifrenizi bu route ile güncelleyemezsiniz', 400));
  }

  //2) İsteğin body kımsına güncellemesine izin verdiğimmiz değerleri al
  const filtredBody = filterObj(req.body, 'name', 'email');

  // eğer fotoğrda varsa kaydedilecek veriler arasına ekle
  if (req.file) filtredBody.photo = req.file.filename;

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
exports.getAllUsers = factory.getAll(User);

// Yeni kullanıcı oluştur
exports.createUser = factory.createOne(User);

// Kullanıcının hesap bilgilerini al
exports.getUser = factory.getOne(User);

// Adminin Kullanıcyı güncellemesi için
exports.updateUser = factory.updateOne(User);

// Adminin Kullanıcyı tamamen kaldırması için
exports.deleteUser = factory.deleteOne(User);
