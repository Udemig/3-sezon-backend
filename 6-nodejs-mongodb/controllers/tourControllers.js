const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

// aylık planı hesaplar
exports.getMonthlyPlan = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      message: 'Plan oluşturulurken hata oldu',
      error: err,
    });
  }
};

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
exports.getTourStats = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(200).json({ message: 'İstatistik hesaplanamadı', err: err });
  }
};

// bütün turları alır
exports.getAllTours = async (req, res) => {
  try {
    // apiFeatures class'ından örnek oluşturduk ve içerisndeki istediğimiz api özelliklerini çağırdık
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();

    // SON) Hazırldaığımız Komutu Çalıştır Verileri Al
    const tours = await features.query;

    res.status(200).json({
      message: 'Veriler başrıyla alındı',
      results: tours.length,
      data: tours,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      message: 'Üzgünüz verileri alırken bir hata oluştu.',
    });
  }
};

// yeni bir tur oluşturur
exports.createTour = async (req, res) => {
  //* 1.yol
  // const yeniTur = new Tour({ ...req.body });
  // yeniTur.save();

  try {
    //* 2.yol
    const newTour = await Tour.create(req.body);

    res
      .status(200)
      .json({ message: 'Veri başarıyla kaydedildi', data: newTour });
  } catch (err) {
    res.status(400).json({
      message: 'Üzgünüz veriyi kadederken bir hata oluştu.',
      err: err,
    });
  }
};

// sadece bir tur alır
exports.getTour = async (req, res) => {
  try {
    //* 1.yol) findOne(): id dışarısında değerleri de destekler
    // const foundTour = await Tour.findOne({ _id: req.params.id });

    //* 2.yol) findById(): sadeceye id'yi destekler
    const founddTour = await Tour.findById(req.params.id);

    res.status(200).json({ message: 'Tur bulundu', data: founddTour });
  } catch (err) {
    res.status(400).json({ message: 'Üzgünüz turu alırken bir hata oluştu' });
  }
};

// bir turu günceller
exports.updateTour = async (req, res) => {
  try {
    // new parametresi ile döndürlecek olan değerin dökümanın eski değil yeni değerleri olmasını istedik
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ message: 'Tur güncellendi', data: updatedTour });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: 'Üzgünüz turu güncellerken bir hata oluştu' });
  }
};

// bir tur kaldırır
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({ message: 'Sİlme işlemi başarısız' });
  }
};
