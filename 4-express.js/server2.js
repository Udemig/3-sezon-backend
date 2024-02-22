// Express modülünü çağır
const express = require('express');

// Bir Express uygulması oluştur
const app = express();

// Bir rota tanımla ve isteği işle
app.get('/', (req, res) => {
  // Durum kodu 200, content type header olan json cevabı gönder
  res.status(200).json({ message: 'Serverdan merhabalar' });
});

// Farklı bir rota tanımı
app.post('/new', (req, res) => {
  // Durum kodu 200, content type header olan json cevabı gönder
  res.status(201).json({ message: 'Başarıyla Oluşturuldu' });
});

// Port 300 üzerinde dinle
app.listen(3001, () => {
  console.log('Server 3001. porta dinlemeye başladı');
});
