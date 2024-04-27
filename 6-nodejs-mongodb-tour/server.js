const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config({ path: './config.env' });

// mongodb veritabanı ile bağlantı sağla
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('Veritabanı ile bağlantı kuruldu'))
  .catch((err) =>
    console.log('HATA!! Veritabanına bağlanırken sorun oluştu', err)
  );

// server'ı ayağa kaldır
app.listen(process.env.PORT, () => {
  console.log(`Uygulama ${process.env.PORT} portunu dinlemeye başladı`);
});
