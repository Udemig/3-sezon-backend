import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import authRouter from './routes/auth.route.js';
import morgan from 'morgan';

// env dosyasındaki veriler erişmek için kurulum
dotenv.config();

// veritabanı ile bağlantı kur
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('Veritabanı ile bağlantı kuruldu'))
  .catch((err) =>
    console.log('Veritabanı ile bağlantı kurulurken bir HATA oluştu', err)
  );

// express uygulması oluştur
const app = express();

//* middlewares
// bodydeki json içeriğinin okunmasını sağlar
app.use(express.json());

// konsola istekleri yazan middlware
morgan('dev');

//* route tanımlama
app.use('/api/auth', authRouter);

//* hata yönetimi
// controller'lardan yapılcak tüm yönelndiröeler bu middleware'i tetikler
app.use((err, req, res, next) => {
  console.log('🔥🔥HATA MEYDANA GELDİ🔥🔥');
  console.log(err);

  const errStatus = err.status || 500;
  const errMessage = err.message || 'Üzgünüz bir şeyler ters gitti';

  return res.status(errStatus).json({
    statusCode: errStatus,
    message: errMessage,
  });
});

// hangi portun dinleniceğini belirleyelim
app.listen(process.env.PORT, () => {
  console.log(`API ${process.env.PORT} poru dinlemeye başladı`);
});
