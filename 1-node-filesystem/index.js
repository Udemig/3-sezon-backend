//* 1) fs modülünü bu dosyayya çağırma
const fs = require('fs');

//* FS (FileSystem)
//* Node.js modüllerden bir tanesi.
//* Sahip olduğu fonksiyonlar sayesinde
//* Bilgisayarın dosya dizinin değişimler yağabilicez.
//* Dosya Okuma / Yazma

/*
 ! Senkron > Blocking Yöntemle
 * Senkron işlemler sırasıyla geçekleşir
 * Yani senk. işlemlerde bir işlem sürüyorken diğer işlem başlamaz
 * Biri bittikten sonra bir sonraki çalışır
 * Bu nedenle tek bir işlem için uzun süre beklendiği senaryoda uygulama
 * uzun bir süre boyun o işlem dışında başka bir görev yapamayabilir
 * Dosya okuma / veritabanı sorguları işlemlerde senkron methodu naidren kullanılırız.
 */

//* 2) Dosya Okuma
const text = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log('doysa okundu');

//* 3) Dosya Yazma
//* Gönderilecek metni hazırla
const newText = `
    Avakado hakkında aldığım bilgiler:
     ${text}
     Oluşturulma Tarihi: 
     ${Date.now()}
`;

//* Yeni dosya oluşturup içeriğini belirle
fs.writeFileSync('./txt/output.txt', newText);
// console.log('doysa yazıldı');

// console.log('Kullanıcı girişi yapıalbiliyor....');

//! Asenkron > Non Blocking
/*
 * Bir işlemi arkaplanda yapmaya görev veriyoruz
 * Görevi bitince bir tane callback function tetikleniyor.
 * Bu sayede biz zaman alıcak işlemleri arkplanda yaparken
 * Projedeki işlevlerin duraksamanın önüne geçiyoruz
 */

fs.readFile('./txt/start.txt', 'utf8', (err, data) => {
  // dosaya okuma sırasında hata oluşursa burası çalışır
  if (err) return console.log('Üzgünüz Hata Oluştu! 💥');

  // dosya okuma kısmında hata yoksa burası çalışır
  // start dosyasında hangi dosya ismi gelirse o dosyayı oku
  fs.readFile(`txt/${data}.txt`, 'utf-8', (err, data) => {
    console.log('Okunan Veri:', data);
  });
});

//* 2) Dosya Okuma
const text2 = fs.readFileSync('./txt/input.txt', 'utf-8');

//! Görev
//* İsim ve içerik dosyalarını  okuyun
//* Yeni bir dosya oluşturun oluşturdğunuz dosyanın ismi
//* isim.txt dosyasına ne yazıldıysa o olsun
//* oluşturlan yeni dosyasnın içeirği icerik.txt dosyasından
//* hangi yazıı geldiyse o olsun

//? Senkron Çözüm
// Adım 1: isim ve içeriği al
const title = fs.readFileSync('./challange/isim.txt', 'utf-8');
const content = fs.readFileSync('./challange/icerik.txt', 'utf-8');

// Adım 2: isim ve içriği dinamik bir dosya oluştur
fs.writeFileSync(`./challange/${title}.txt`, content);

//? Asenkron Çözüm
// 1) İsmi Al
fs.readFile('./challange/isim.txt', 'utf-8', (err, title1) => {
  if (err) return console.log('İsim Alınamadı');

  // 2) İçeriği al
  fs.readFile('./challange/icerik.txt', 'utf-8', (err2, content1) => {
    if (err2) return console.log('İçeirk alınamadı');

    // 3) Yeni dosya oluştur
    fs.writeFileSync(`./challange/${title1}.txt`, content1);
  });
});
