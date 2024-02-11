const fs = require('fs');
const crypto = require('crypto');
const bodyParser = require('../utils/body-parser');

module.exports = async (req, res) => {
  if (req.url === '/api/movies') {
    try {
      // isteğin body kısmına eriş
      let body = await bodyParser(req);

      // hata kontrolü
      if (!body.title || !body.year || !body.genre || !body.rating) {
        res.writeHead(404);
        res.end('Lütfen filmin bütün alanlarını tnaımlayın');
        return;
      }

      // yeni film verisine benzersiz id ekle
      body.id = crypto.randomUUID();

      // bütün filmleri al ve js verisine çevir
      let data = fs.readFileSync('./data/movies.json', 'utf-8');
      data = JSON.parse(data);

      // yeni filmi bütün filmlerin arasına ekle
      data.movies.push(body);

      // json dosyasına güncelle
      fs.writeFileSync('./data/movies.json', JSON.stringify(data));

      // client'a cevap gönder
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(body));
    } catch (err) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'Yol bulunamadı' }));
    }
  }
};
