const http = require('http');
const getRequest = require('./methods/get-request');
const postRequest = require('./methods/post-request');
const deleteRequest = require('./methods/delete-request');

// 1) http server oluştur
const server = http.createServer((req, res) => {
  switch (req.method) {
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
