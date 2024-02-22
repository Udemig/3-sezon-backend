const http = require('http');
const getRequest = require('./methods/get-request');
const postRequest = require('./methods/post-request');
const deleteRequest = require('./methods/delete-request');

// 1) http server oluştur
const server = http.createServer((req, res) => {
  // bütün isteklerde gönderilicek header ekle
  // frontend'in erişimine engel olmaz. cors ahtasını önler
  res.setHeader('Access-Control-Allow-Origin', '*');

  switch (req.method) {
    // Frontend'den bir post/delete/patch isteği atıldığı zaman
    // tarayıcı öncelikle server'ı kontrol etme amaçlı post isteği
    // atamak yerine options atıyor. Bizimde bu isteği ele alıp
    // server'ın deteklediği http methodlarını aşağıdaki header'la
    // göndermemiz gerekkti. Bu header'ları içeren bir cevap gönderdiğimiz
    // zaman tararyıcı bu sefer doğru methodla istek atıyor.
    case 'OPTIONS':
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
      );

      res.end();
      break;

    case 'GET':
      getRequest(req, res);
      break;

    case 'POST':
      postRequest(req, res);
      break;

    case 'DELETE':
      deleteRequest(req, res);
      break;

    default:
      // cevabın durum kodunu günclle
      res.statusCode = 404;

      // gönderilen cevaba yeni header ekle
      res.setHeader('Content-Type', 'application/json');

      // gönderilcek cevabın içeriğini belirle
      res.write(
        JSON.stringify({
          message: 'Sayfa bulunamadı',
        })
      );

      // cevabı client'a gönder
      res.end();
  }
});

// 2) belirli porta gelen istekleri dinle
const port = 5001;

server.listen(port, () => {
  console.log(`Server ${port}'a gelen istekleri dinlemeye başladı.`);
});
