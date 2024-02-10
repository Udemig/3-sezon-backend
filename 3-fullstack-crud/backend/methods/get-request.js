const fs = require('fs');

module.exports = (req, res) => {
  if (req.url === '/api/movies') {
    //1) durum kodunu belirle
    res.status = 200;

    //2) headerları belirle
    res.setHeader('Content-Type', 'application/json');

    //3) json dosyasından film veilerini al
    const movies = fs.readFileSync('./data/movies.json', 'utf-8');

    //4) cevabı gönder
    res.end(movies);
  }
};
