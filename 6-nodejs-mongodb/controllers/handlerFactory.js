const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// delete işlemini proje içerisnde sadece model ismini değiştriiek defalarca kullanıp gereksiz kod tekrarına sebep oluyorduk bizde bu kod tekrarini önlemek için silme işlevindeki dinamik olan modeli parametre olarak alıyoruz. herhangi birro ute eleman silinmesi gerektiğinde bu methodu çağırığ parametre oalrak silinicek elemanın modelinni gönderiyoruz bu sayede büyük bir kod kalabalığından kurtuluyoruz
exports.deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    // TODO CUSTOM HATA MESAJI EKLE

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

// Güncelleme işlemi için ortak olarak kullanılabilecek method

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // new parametresi ile döndürlecek olan değerin dökümanın eski değil yeni değerleri olmasını istedik
    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: 'Belge başarıyla güncellendi', data: updated });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    res
      .status(200)
      .json({ message: 'Belge başarıyla oluşturuldu', data: document });
  });

exports.getOne = (Model, popOptionts) =>
  catchAsync(async (req, res, next) => {
    // bir sorgu oluştur
    let query = Model.findById(req.params.id);

    // eğer populate ayarları varsa sorguya ekle
    if (popOptionts) query = query.populate(popOptionts);

    // sorguyu çalıştır
    const found = await query;

    // cevabı gönder
    res.status(200).json({ message: 'Belge bulundu', data: found });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //* /reviews > bütün yorumları getir
    //* /tours/tur_id/reviews > bir tura atılan yorumları getir
    let filter = {};

    // eğer urlde turid paramtresi varsa yapılcak sorguyu bir tura ait yorumları alıcak şekilde güncelle
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // apiFeatures class'ından örnek oluşturduk ve içerisndeki istediğimiz api özelliklerini çağırdık
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();

    // Hazırldaığımız Komutu Çalıştır Verileri Al
    const docs = await features.query;

    res.status(200).json({
      message: 'Belgeler başarıyla alındı',
      results: docs.length,
      data: docs,
    });
  });
