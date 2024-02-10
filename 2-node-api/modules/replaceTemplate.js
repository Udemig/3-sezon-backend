// Card html'ini alıcak ve ürün bilgilerini alıcak
// Kart hml'inde değişken oalrak tanılanan alanlara
// ürünün bilgilerini ekliyecek ve ürünce özel oluşan
// kartı göndericek

const replaceTemplate = (cardTemplate, data) => {
  // htmlde değişken olan alanları güncelle
  let output = cardTemplate.replace(
    /%PRODUCTNAME%/g,
    data.productName
  );

  output = output.replace(/{%PRICE%}/g, data.price);
  output = output.replace(/{%QUANTITY%}/g, data.quantity);
  output = output.replace(/{%IMAGE%}/g, data.image);
  output = output.replace(/{%ID%}/g, data.id);
  output = output.replace(/{%DESCRIPTION%}/g, data.description);
  output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
  output = output.replace(/{%FROM%}/g, data.from);

  // eğer ürün organik değilse {notorganic} değişkeni yerine not-orgnaic classını koy
  if (data.organic === false) {
    output = output.replace('{%NOT_ORGANIC%}', 'not-organic');
  }

  // oluşturğumuz html'i göndericez
  return output;
};

// replaceTemplate isimli ffonksiyonu
// projedeki diğer js'dosylarından erişelebilir hale getiriyoruz
module.exports = replaceTemplate;
