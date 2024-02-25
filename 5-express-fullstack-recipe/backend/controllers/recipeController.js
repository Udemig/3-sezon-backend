const { getData } = require('../utils/getData');
const { setData } = require('../utils/setData');
const crypto = require('crypto');

// json sosyasından verileri alıyoruz
let data = getData();

exports.getAllRecipes = (req, res) => {
  // tariflerin bir kopyasını oluşturyoruz
  let recipes = [...data];

  // aratılan terime eriş
  const searchTerm = req.query?.title?.trim()?.toLowerCase();

  // sırlama parametresine eriş
  const order = req.query.order;

  // eğerki artılan terim varsa filtrele
  if (searchTerm) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(searchTerm)
    );
  }

  // eğerki order varsa sırala
  if (order) {
    recipes.sort((a, b) =>
      order === 'asc'
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  // cevap gönder
  res.status(200).json({
    message: 'Tarifler başarıyla gönderildi',
    results: recipes.length,
    recipes: recipes,
  });
};

exports.createRecipe = (req, res) => {
  //1) isteğin body'si ile gelen veriye eriş
  const newRecipe = req.body;

  //2) verinin bütün değerleri tanımlanmışmı kontrol et
  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.category ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res.status(400).json({ message: 'Lütfen bütün değerli tanımlayın' });
  }

  //3) veriye id ekle
  newRecipe.id = crypto.randomUUID();

  //4) yeni tarifi diziyi ekle
  data.push(newRecipe);

  //5) yeni diziyi json dosyasına yaz
  setData(data);

  //6) cevap gönder
  res.status(200).json({ message: 'Yeni tarif oluşturuldu', recipe: data });
};

exports.getRecipe = (req, res) => {
  // cevap gönderdik
  res.status(200).json({
    message: 'Aradığınız tarif bulundu',
    recipe: req.recipe,
  });
};

exports.deleteRecipe = (req, res) => {
  // silinecek elemanın sırasını bul
  const index = data.findIndex((i) => i.id == req.params.id);

  // sırası bilenen elemanı diziden kaldır
  data.splice(index, 1);

  // json dosyasını güncelle
  setData(data);

  // cevap gönder
  res.status(204).json({ message: 'Başarıyla Silindi' });
};
