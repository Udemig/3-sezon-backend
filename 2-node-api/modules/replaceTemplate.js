// Card html'ini alıcak ve ürün bilgilerini alıcak
// KArt hml'inde değişken oalrak tanılanan alanlara
// ürünün bilgilerini ekliyecek ve ürünce özel oluşan
// kartı göndericek

const replaceTemplate = (cardTemplate, data) => {
  console.log('kart dönüştürülüyor');
  console.log(cardTemplate, data);
};

// replaceTemplate isimli ffonksiyonu
// projedeki diğer js'dosylarından erişelebilir hale getiriyoruz
module.exports = replaceTemplate;
