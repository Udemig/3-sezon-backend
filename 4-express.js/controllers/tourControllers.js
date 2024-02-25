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
  // elemnın güncellenicek olan veileri
  const updatedData = req.body;

  // güncelenneicek turun id'sini alma
  const id = req.params.id;

  // güncelllenicek elemanın dizideki sırasını bul
  const index = tours.findIndex((i) => i.id === id);

  // dizideki id'sini bildiğimiz elemanın updatedData içersinde gelen değerlerini
  // güncelle updatedData içersinde olamyan değerleride sabir bırakmam gerekli
  const updatedTour = { ...req.tour, ...updatedData };

  // diziyi güncelle
  tours.splice(index, 1, updatedTour);

  // json dosyasını güncelle
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        // cevap gönder
        res.status(404).json({
          status: 'Güncelleme işlemi başarısız oldu',
        });
      } else {
        // cevap gönder
        res.status(200).json({
          status: 'Tur Başarıyla Güncellendi',
          tour: updatedTour,
        });
      }
    }
  );
};

console.log(__dirname);

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
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    () => {
      res.status(204).send();
    }
  );
};
