const fs = require('fs');

module.exports = (req, res) => {
  //  url'in yol kısmını al
  const baseUrl = req.url.substring(0, req.url.lastIndexOf('/'));

  // url'i parçalara ayır ve id parametresini al
  const id = req.url.split('/')[3];

  if (baseUrl === '/api/movies' && id) {
    // bütün filmleri al
    let data = fs.readFileSync('./data/movies.json', 'utf-8');
    data = JSON.parse(data);

    // id'li film dizide var mı kontrol et
    const foundItem = data.movies.find((item) => item.id == id);

    // film dizide yoksa hata ver
    if (!foundItem) {
      res.writeHead(404);
      return res.end('Id geçersiz');
    }

    // diziden id'sini bilinen filmi kaldır
    const filtred = data.movies.filter((item) => item.id != id);
    data.movies = filtred;

    // json dosyasını güncelle
    fs.writeFileSync('./data/movies.json', JSON.stringify(data));

    // client'a cevap gönder
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
  } else {
    res.writeHead(404);
    res.end('Yol Bulunamadı');
  }
};
