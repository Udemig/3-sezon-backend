const express = require("express");
const {
  getAllTours,
  getTour,
  deleteTour,
  updateTour,
  createTour,
  getTourStats,
  aliasTopTours,
  getMonthlyPlan,
} = require("../controllers/tourControllers");
const { protect, restrictTo } = require("../controllers/authControllers");
// router oluşturma
const router = express.Router();

// en iyi 5 f/p taneyi veren route
// aslında frontend getAllToursa istek atıp parametreleri gönderirse aynı sonucu alaablir
// ama aynı sonucu almak için fazla paramtre geirmesi gerkeli ve frontend tarafından sıklıkla istendiği için
// yeni bir route oluşuyoruz bu route'a istek atıldığında parametreleri middlware ile biz belirliyecez
router
  .route("/top-five-best")
  .get(protect, restrictTo("admin"), aliasTopTours, getAllTours);

// turların istiastiklerini almak için route
// gerçek seneryo: admin paneli siçin zorluğa göre turların istatistiklerini hesapla
router.route("/tour-stats").get(protect, restrictTo("admin"), getTourStats);

// gerçek senaryo: belirli  bir yıl için her ay başlıyacak olan turları al
router
  .route("/monthly-plan/:year")
  .get(protect, restrictTo("admin"), getMonthlyPlan);

// router için yolları tanımlama
router
  .route("/")
  .get(getAllTours)
  .post(protect, restrictTo("guide", "lead-guide", "admin"), createTour);

router
  .route("/:id")
  .get(getTour)
  .delete(protect, restrictTo("lead-guide", "admin"), deleteTour)
  .patch(protect, restrictTo("guide", "lead-guide", "admin"), updateTour);

// router'ı app'e tanıtmak için export et
module.exports = router;
