const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
var hpp = require('hpp');

// express kurulum
const app = express();

// güvenlik için headerlar ekler
app.use(helmet());

// istek detylarını konsola yazan middlware
app.use(morgan('dev'));

// bir ip adresinden belirli süre içerinde gelicek olan istekleri sınırla
const limiter = rateLimit({
  max: 100, // aynı ip adresinden gelicek maks istek sınırı
  windowMs: 60 * 60 * 1000, // ms cinsinden 1 saat
  message:
    '1 saat içerisndeki istek hakkınızı doldurdunuz.Daha sonra tekrar deneyiniz',
});

// middleware'i api route'ları için tanıtma
app.use('/api', limiter);

// body headers vs. gelen json verisini js'de kullanbilir formata getirir
app.use(express.json({ limit: '10kb' }));

// Data sanitization - Verileri Sterelize Etme - Query Injection
// isteğin body / params / header kısmına eklenen her türlü opeatörü  kaldır
app.use(mongoSanitize());

// html kodunun içeriesinde saklanan js'yi tespi eder ve bozar
app.use(xss());

// paramtre kirliliğini önler
app.use(hpp({ whitelist: ['duration', 'ratingsQuantity'] }));

// tour ve user route'larını projeye tanıt
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// tanımlanmayan bir route istek atıldığında hata ver
app.all('*', (req, res, next) => {
  // hata detaylarını belirle
  const error = new AppError("Tanımlanmyan bir route'a istek attınız", 404);

  // hata middlwareine yönlendir ve hata bilgilerini gönder
  next(error);
});

// hata olduğunda devreye giren bir middlware
// hata bilgilerini alır ve cevap olarak gönderir
app.use((err, req, res, next) => {
  // hata detaylarını konsola yaz
  console.log(err.stack);

  // durum kodu veya durum değerleri gönderilmediğinde varsayılan değerler devreye girsin
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Üzgünüz bir hata oluştu';

  // cevap gönder
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
