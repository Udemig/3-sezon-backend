const fs = require('fs');

/*
 * Eğerki istek direkt "/api/movies"'e istek atıldıysa bütün filmleri göndericez
 * Ama isteğin base'url i  "/api/movies" ise ve id de bulunuyosa o id'li filmi göndericez
 */

module.exports = async (req, res) => {
  //  url'in yol kısmını al
  const baseUrl = req.url.substring(0, req.url.lastIndexOf('/'));

  // url'i parçalara ayır ve id parametresini al
  const id = req.url.split('/')[3];

  if (req.url === '/api/movies') {
    //1) durum kodunu belirle
    res.status = 200;

    //2) headerları belirle
    res.setHeader('Content-Type', 'application/json');

    //3) json dosyasından film veilerini al
    const movies = fs.readFileSync('./data/movies.json', 'utf-8');

    //4) cevabı gönder
    res.end(movies);
  } else if (baseUrl === '/api/movies' && id) {
    // bütün filmleri al
    let data = fs.readFileSync('./data/movies.json', 'utf-8');

    // json fomatındaki veriyi js formatına çevir
    data = JSON.parse(data);

    // filmlerin arsasından id'sini bildiğimiz filmi seç
    const movie = data.movies.find((item) => item.id == id);

    if (movie) {
      // eğerki film bulunduysa filmi gönder
      // cevap ayarlarını belirle
      res.writeHead(200, { 'Content-Type': 'application/json' });

      // cevabı gönder
      res.end(JSON.stringify(movie));
    } else {
      // film bulunamaıysa
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });

      // cevabı gönder
      res.end(
        JSON.stringify({
          message: 'Gönderidğiniz id ile eşeleşn film bulunamadı',
        })
      );
    }
  } else {
    // doğru url'e istek atmadıysa hata gönder
    res.writeHead(404, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        title: 'Bulunamadı',
        message: 'İstek attığınız yol geçersiz',
      })
    );
  }
};
