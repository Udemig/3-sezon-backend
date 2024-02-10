// modülü bu dosyaya çağırma
const http = require('http');
const fs = require('fs');
const url = require('url');

// farklı dosyadan export edilen fonksiyonu buraya çağırdık
const replaceTemplate = require('./modules/replaceTemplate');

//! API
// Gelen istekleri izler
// Ve cevap gönderir

/*
 * CreateServer methoduna verdiğimiz dinleyici fonksiyon
 * tetiklendiyse bir api isteği gelmiştir.
 
 * Bu dinlyeci fonksiyon 2 parametre alır
 * 1) request > gelen istek
 * 2) response > gönderlicek cevap

 * Biz gelen isteğe cevap göndermeliyiz
 * res.end("") > client'a cevap göndermeye yarar 
 */

/*
 * Routing:
 * Apı'a gelen isteğin hangi uç noktaya geldiğini
 * tespit edip ona göre cevap cevap gönderme işlemine denir.
 * Routin için client'ın hangi yola istek attığını
 * ve hangi http mehodunu kullandığını bilmemiz gerekiyor
 */

// html şablon verilerine eriş
let tempOverview = fs.readFileSync(
  './templates/template-overview.html',
  'utf-8'
);

let tempProduct = fs.readFileSync(
  './templates/template-product.html',
  'utf-8'
);

let tempCard = fs.readFileSync(
  './templates/template-card.html',
  'utf-8'
);

// json formatında
let data = fs.readFileSync('./dev-data/data.json', 'utf-8');

// js formatına çevir
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // url'i parçalar ayırdık
  const { pathname, query } = url.parse(req.url, true);

  // eğerki yukarıda tanımlanmayan sayflara giderse
  switch (pathname) {
    // ansayfa
    case '/overview':
      // meyveler dizsini dö ve her bir meyve verisi için
      // meyeveye özel bir kart html'i oluştur
      const cardHTML = dataObj.map((el) =>
        replaceTemplate(tempCard, el)
      );

      // anasayfa template'İndeki kartlar alanına kart html'ini ekle
      // {%PRODUCT_CARDS%} ile tanımlanın alanın yerine ürün kart htmlini koy
      tempOverview = tempOverview.replace(
        '{%PRODUCT_CARDS%}',
        cardHTML
      );

      return res.end(tempOverview);

    // ürün detay sayfası
    case '/product':
      // 1) diziden doğru elemanı bul
      const item = dataObj.find((item) => item.id == query.id);

      // 2) template'i bulunan elemanın verilerine göre güncelle
      const output = replaceTemplate(tempProduct, item);

      // 3) güncel template'i client'a gönder
      return res.end(output);

    default:
      return res.end('Aradaiginiz sayfa bulunamadi');
  }
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/*
 Bir dinleyici oluşturup
 Hangi adrese gelen istekleri dinleyeceğimizi söylemeliyiz
 */

server.listen(4000, '127.0.0.1', () => {
  // dinleme işlemine başlandığı zaman tetiklenir
  console.log('4000. porta gelen istekler dinlenmeye başlandı');
});
