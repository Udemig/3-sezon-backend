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
} = require('../controllers/tourControllers');

// router oluşturma
const router = express.Router();

// en iyi 5 f/p taneyi veren route
// aslında frontend getAllToursa istek atıp parametreleri gönderirse aynı sonucu alaablir
// ama aynı sonucu almak için fazla paramtre geirmesi gerkeli ve frontend tarafından sıklıkla istendiği için
// yeni bir route oluşuyoruz bu route'a istek atıldığında parametreleri middlware ile biz belirliyecez
router.route('/top-five-best').get(aliasTopTours, getAllTours);

// turların istiastiklerini almak için route
// gerçek seneryo: admin paneli siçin zorluğa göre turların istatistiklerini hesapla
router.route('/tour-stats').get(getTourStats);

// gerçek senaryo: belirli  bir yıl için her ay başlıyacak olan turları al
router.route('/monthly-plan/:year').get(getMonthlyPlan);

// router için yolları tanımlama
router.route('/api/tours').get(getAllTours).post(createTour);

router
  .route('/api/tours/:id')
  .get(getTour)
  .delete(deleteTour)
  .patch(updateTour);

// router'ı app'e tanıtmak için export et
module.exports = router;
