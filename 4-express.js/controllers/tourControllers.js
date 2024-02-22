const fs = require('fs');
const crypto = require('crypto');

// ! Controllers
// Projedeki endpoint'leri istek atılınca devreye giricek olan
// gelen isteği işleyip kullanıcıya cevap gönderen fonksiyonları
// tutuğumuz dosya

// turların verisini alma
let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Bütün turları getirir
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    tours: tours,
  });
};

// 1 Tane tur getirir
exports.getTour = (req, res) => {
  // cevap olarak gönder
  res.status(200).json({
    status: 'Aradağınız tur bulundu',
    tour: req.tour,
  });
};

// Turu Günceller
exports.updateTour = (req, res) => {
  // todo turu ve json'dosyasını güncelle

  // cevap gönder
  res.status(200).json({
    status: 'Tur Başarıyla Güncellendi',
    tour: 'Güncel Tur Verisi',
  });
};

// Yeni Tur Oluştur
exports.createTour = (req, res) => {
  // elmizdeki nesneyi değiştirmden yeni değer ekleme
  const newTour = Object.assign({ id: crypto.randomUUID() }, req.body);

  // turlar dizsinin sonuna yeni turu ekle
  tours.push(newTour);

  // json dosyasını güncelle
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      // cevap gönder
      res.status(201).json({
        status: 'başarıyla oluşturuldu',
        newTour: newTour,
      });
    }
  );
};

// Turu Kaldırır
exports.deleteTour = (req, res) => {
  // turu kaldır
  const newTours = tours.filter((i) => i.id !== req.params.id);

  // json dosyasını güncelle
  JSON.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    newTours,
    () => {
      res.status(204).send();
    }
  );
};
