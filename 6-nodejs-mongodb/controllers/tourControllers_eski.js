const Tour = require('../models/tourModel');

// bütün turları alır
exports.getAllTours = async (req, res) => {
  try {
    //* url'den alınan parametreler { duration: { gt: '14' }, price: { lte: '600' } }
    //* mongoose'un isteği format   { duration: { $gt: '14' }, price: { $lte: '600' } }
    // Bizim yapmamız gereken url'den alınan parametrelerde eğerki kullanılan bir mongodb operatörü varsa operatöün başına + koymalıyız

    //! 1) FİLTRELEME
    //1.1) istek ile gelen parametreler
    const queryObj = { ...req.query };

    //1.2) filtreleme dışarısında kullanmıcğımız parametreleri queryObj'den kaldır
    const excludedFields = ['sort', 'limit', 'page', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1.3) replace kullanbilmek için nesneyi stringe çevir
    let queryString = JSON.stringify(queryObj);

    //1.4) bütün operatörlerin başına $ ekle
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt|ne)\b/g,
      (found) => `$${found}`
    );

    //1.5) tur veirlerini filtrele
    let query = Tour.find(JSON.parse(queryString));

    //! 2) SIRALAMA
    if (req.query.sort) {
      //2.1) params.sort geldiyse gelen değere göre sırala
      // gelen:      -ratingsAverage,duration
      // istediğimiz: -ratingsAverage duration
      const sortBy = req.query.sort.split(',').join(' ');

      query = query.sort(sortBy);
    } else {
      //2.1) params.sort gelmediyse tarihe göre sırala
      query = query.sort('-createdAt');
    }

    //! 3) ALAN LİMİTLEME
    if (req.query.fields) {
      //3.1) params.fields geldiyse  istenmeyen alanları kaldır
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      //3.2) fields gelmediyse __v değerini kaldır
      query.select('-__v');
    }

    //! 4) SAYFALAMA
    // skip > kaç tane döküman atlanıcak
    // limit > max kaç döküman alıncak
    const page = Number(req.query.page) || 1; // sayfa değeri 5 olduğunu varsayalım
    const limit = Number(req.query.limit) || 10; // limit değeri 20 olsun
    const skip = (page - 1) * limit; // 5.sayfadakileri görmek için atlanıcak eleman 80'dir

    // veritabanına yapılcak olan isteği güncelle
    query = query.skip(skip).limit(limit);

    // SON) Hazırldaığımız Komutu Çalıştır Verileri Al
    const tours = await query;

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
