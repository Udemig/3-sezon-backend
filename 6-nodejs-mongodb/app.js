const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// istek detylarını konsola yazan middlware
app.use(morgan("dev"));

// body headers vs. gelen json verisini js'de kullanbilir formata getirir
app.use(express.json());

// tour ve user route'larını projeye tanıt
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// tanımlanmayan bir route istek atıldığında hata ver
app.all("*", (req, res, next) => {
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
  err.status = err.status || "error";
  err.message = err.message || "Üzgünüz bir hata oluştu";

  // cevap gönder
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
