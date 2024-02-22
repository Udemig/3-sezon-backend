const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('./controllers/tourControllers');
const {
  loggerMiddleware,
  controlMiddleware,
} = require('./middleware/middleware');

const app = express();
const PORT = 3000;

// middleware (arayazılım)
// isteğin gelmesiyle cevap gönderilmesi arasında çalışan fonksiyon
// isteğin body'sini otomatik olarka işler
app.use(express.json());

// API route'larını tanımlamanın 1 yolu
// eğerki aynı route altında farklı http methodlarına
// cevap vericekseksek hepsini ayrı ayrı yazmak yerime
// tek bir route altında toplayabiliyoruz
app.use(loggerMiddleware);

app
  .route('/api/v1/tours')
  .get(getAllTours) //
  .post(createTour);

// id varmı kontrol edicek yoksa sonraki adıma geçmeyecek
app.use(controlMiddleware);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunu dinlemeye başladı`);
});
