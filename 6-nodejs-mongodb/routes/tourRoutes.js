const express = require('express');
const {
  getAllTours,
  getTour,
  deleteTour,
  updateTour,
  createTour,
  getTourStats,
  aliasTopTours,
  getMonthlyPlan,
  getToursWithin,
} = require('../controllers/tourControllers');
const { protect, restrictTo } = require('../controllers/authControllers');
const reviewController = require('../controllers/reviewControllers');
const reviewRoutes = require('../routes/reviewRoutes');

// router oluşturma
const router = express.Router();

// en iyi 5 f/p taneyi veren route
// aslında frontend getAllToursa istek atıp parametreleri gönderirse aynı sonucu alaablir
// ama aynı sonucu almak için fazla paramtre geirmesi gerkeli ve frontend tarafından sıklıkla istendiği için
// yeni bir route oluşuyoruz bu route'a istek atıldığında parametreleri middlware ile biz belirliyecez
router
  .route('/top-five-best')
  .get(protect, restrictTo('admin'), aliasTopTours, getAllTours);

// turların istiastiklerini almak için route
// gerçek seneryo: admin paneli siçin zorluğa göre turların istatistiklerini hesapla
router.route('/tour-stats').get(protect, restrictTo('admin'), getTourStats);

// gerçek senaryo: belirli  bir yıl için her ay başlıyacak olan turları al
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin'), getMonthlyPlan);

// belirli bir alan içerisndeki turları al
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

// router için yolları tanımlama
router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('guide', 'lead-guide', 'admin'), createTour);

router
  .route('/:id')
  .get(getTour)
  .delete(protect, restrictTo('lead-guide', 'admin'), deleteTour)
  .patch(protect, restrictTo('guide', 'lead-guide', 'admin'), updateTour);

//! Nested Route Tanımlama
// POST /tours/124dsf466/reviews > yeni tur ekle
// GET /tours/213412dsf4/reviews > bir tura ait yorumları ver
// GET /tours/124asdas23/reviews/124ad324 > bir yorumun bilgilerini al

// review route'a istek attığımız zaman isteğin body kısmına turun id'si eklenmeliydi
// bu endpointe istek atıldığında url'den id'yi alıcaz
router.use('/:tourId/reviews', reviewRoutes);

// router'ı app'e tanıtmak için export et
module.exports = router;
