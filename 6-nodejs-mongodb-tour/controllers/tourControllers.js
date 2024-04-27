const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// aylık planı hesaplar
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  // parametre olarak gelen yılı al
  const year = Number(req.params.year);

  // Raporlama adımları
  const plan = await Tour.aggregate([
    //1) turların başlangıç tarihlerini böl her turun bir tarihi olsun
    { $unwind: '$startDates' },
    //2) belirli bir yılda başlayanları al
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    // 3) turları ay'lara göre gruplandır
    {
      $group: {
        _id: { $month: '$startDates' }, // aylara göre grupla
        numTourStarts: { $sum: 1 }, // her ay başlayan tur sayısını hesapla
        tours: { $push: '$name' }, // her turun ismini diziye aktar
      },
    },
    // 4) rapordaki nesnelere ay elemanı ekle
    {
      $addFields: { month: '$_id' },
    },
    // 5) rapordaki nesnlerden eleman çıkarma
    {
      $project: {
        _id: 0,
      },
    },
    // 6) aylaara görre artan sırala
    {
      $sort: {
        month: 1,
      },
    },
  ]);

  res.status(200).json({
    message: 'Aylık plan başarıyla oluşturuldu',
    data: plan,
  });
});

// Alias Route (Takma Ad)
exports.aliasTopTours = (req, res, next) => {
  // get all tours'un en iyi beş tanesini vermesi için gerekli parametreleri ekledik
  req.query.sort = '-ratingsAvarage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  req.query.limit = '5';

  // bir sonraki adım olan getAllTour'un çalışmasını söyledik
  next();
};

// İstatisktikleri hesaplar
exports.getTourStats = catchAsync(async (req, res, next) => {
  // Aggregation Pipeline
  // Raporlama Adımları
  const stats = await Tour.aggregate([
    // 1.Adım ) ratingi 4 ve üstü olanlarını al
    {
      $match: { ratingsAverage: { $gte: 4.0 } },
    },
    // 2.Adım ) zorluklarına göre gruplandır ve ortalama değerlerini hesapla
    {
      $group: {
        _id: '$difficulty',
        elemanSayisi: { $sum: 1 }, // döküman sayısı kadar toplama yapar
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    // 3.Adım ) gruplanan veriyi fiyatlarana göre artan sırala
    {
      $sort: { avgPrice: 1 },
    },
    // 4.Adım ) fiyatı 400 den küçük olanları kaldır
    {
      $match: { minPrice: { $gte: 400 } },
    },
  ]);

  console.log(stats);

  res
    .status(200)
    .json({ message: 'Raporunuz başarıyla oluşturuldu', data: stats });
});

// bütün turları alır
exports.getAllTours = factory.getAll(Tour);

// yeni bir tur oluşturur
exports.createTour = factory.createOne(Tour);

// sadece bir tur alır
exports.getTour = factory.getOne(Tour, 'reviews');

// bir turu günceller
exports.updateTour = factory.updateOne(Tour);

// bir tur kaldırır
exports.deleteTour = factory.deleteOne(Tour);

// sınırlar içerisndeki turları al
exports.getToursWithin = async (req, res, next) => {
  const { latlng, distance, unit } = req.params;

  // enlem ve boylamı değişkenlere aktar
  const [lat, lng] = latlng.split(',');

  // gelen unite göre yarı çap hesapla
  const radius = unit == 'mi' ? distance / 3963.2 : distance / 6378.1;

  // merkez noktası gönderilmediyse hata ver
  if (!lat || !lng) return next(new AppError('Lütfen merkezi tanımlayın'));

  // sınırlar içerisndeki turları al
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lat, lng], radius] } },
  });

  // cevap gönder
  res.status(200).json({
    message: 'Verilen sınırlar içersindeki turlar bulundu',
    tours,
  });
};

// uzaklıkları hesapla
exports.getDistances = async (req, res, next) => {
  // urldeki paramlara eriş
  const { latlng, unit } = req.params;

  // enlem ve boylamı ayır
  const [lat, lng] = latlng.split(',');

  // enleme ve boylam var mı kontrol et
  if (!lat | !lng)
    return next(new AppError('Lütfen geçerli enlem ve boylam verin'));

  // unite göre multiplier hesapla
  const multiplier = unit === 'mi' ? 0.000621371192 : 0.001;

  // turların kullanıcın konumundan uzaklıklarını hesapla
  const distances = await Tour.aggregate([
    // 1) merkez noktayı verip turların o konumdan uzakluklarını hesapla
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [+lat, +lng],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier, // metre cevabnı istenen formata çevirmek için çarp
      },
    },

    // 2) nesneden istediğimiz değerleri seçme
    {
      $project: {
        name: 1,
        distance: 1,
      },
    },
  ]);

  // clienta cevap gönder
  res.status(200).json({
    message: 'Turların verdiğiniz konuma olan uzaklıkları hesaplandı.',
    data: distances,
    unit,
  });
};
