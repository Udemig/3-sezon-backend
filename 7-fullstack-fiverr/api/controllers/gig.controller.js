import error from './../utils/error.js';
import Gig from '../models/gig.model.js';

// 1) Bütün hizmetleri al
export const getAllGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find();

    res.status(200).json({
      message: 'Hizmetler alındı',
      gigs,
    });
  } catch (err) {
    next(error(500, 'Hizmetler alınırken bir sorun oluştu'));
  }
};

// 2) Bir hizmeti al
export const getGig = async (req, res, next) => {
  try {
    // urle param olarak eklenen id den yola çıkarak hizmetin bilgilerine eriş
    const gig = await Gig.findById(req.params.id);

    res.status(200).json({
      message: 'Hizmet bullundu',
      gig: gig,
    });
  } catch (err) {
    // gönderilen id'de hizmet yoksa hata gönder
    next(error(404, "Bu id'ye sahip bir hizmet bulunamadı"));
  }
};

// 3) Yeni hizmet oluştur
export const createGig = async (req, res, next) => {
  // kullanıcı satıcı değilse hata gönder
  if (!req.isSeller)
    return next(error(403, 'Sadece satıcılar hizmet oluşturabilir'));

  // yeni hizmet oluştur
  const newGig = new Gig({
    user: req.userId,
    ...req.body,
  });

  try {
    // hizmeti kaydet
    const savedGig = await newGig.save();

    // client'a cevap gönder
    res.status(200).json({
      message: 'Hizmet başarıyla oluşturuldu',
      gig: savedGig,
    });
  } catch (err) {
    console.log(err);
    next(error(500, 'Hizmet oluşturulurken bir sorun oluştu'));
  }
};

// 4) Bir hizmeti sil
export const deleteGig = async (req, res, next) => {
  res.status(200).json({
    message: "Backend'den cevap gönderildi",
  });
};
