// Fİltreleme Sıralama Sayfalama Alan Limitleme gibi API!da sıkça kullanacağımız işlemlerin yendien kullanılabilir bir şekilde tanımlanması bize projenin devamında muazzam bir kod kalabılığından kuratarıcak
class APIFeatures {
  constructor(query, queryParams) {
    this.query = query; // veritbanına atılcak olan istek
    this.queryParams = queryParams; // arama parametreleri
  }

  //! 1) FİLTRELEME
  filter() {
    //* url'den alınan parametreler { duration: { gt: '14' }, price: { lte: '600' } }
    //* mongoose'un isteği format   { duration: { $gt: '14' }, price: { $lte: '600' } }
    // Bizim yapmamız gereken url'den alınan parametrelerde eğerki kullanılan bir mongodb operatörü varsa operatöün başına + koymalıyız

    //1.1) istek ile gelen parametreler
    const queryObj = { ...this.queryParams };

    //1.2) filtreleme dışarısında kullanmıcğımız parametreleri queryObj'den kaldır
    const excludedFields = ['sort', 'limit', 'page', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1.3) replace kullanbilmek için nesneyi stringe çevir
    let queryString = JSON.stringify(queryObj);

    //1.4) bütün operatörlerin başına $ ekle
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt|ne)\b/g,
      (found) => `$${found}`
    );

    //1.5) tur veirlerini filtrele
    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  //! 2) SIRALAMA
  sort() {
    if (this.queryParams.sort) {
      //2.1) params.sort geldiyse gelen değere göre sırala
      // gelen:      -ratingsAverage,duration
      // istediğimiz: -ratingsAverage duration
      const sortBy = this.queryParams.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      //2.1) params.sort gelmediyse tarihe göre sırala
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  //! 3) ALAN LİMİTLEME
  limit() {
    if (this.queryParams.fields) {
      //3.1) params.fields geldiyse  istenmeyen alanları kaldır
      const fields = this.queryParams.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      //3.2) fields gelmediyse __v değerini kaldır
      this.query = this.query.select('-__v');
    }

    return this;
  }

  //! 4) SAYFALAMA
  paginate() {
    // skip > kaç tane döküman atlanıcak
    // limit > max kaç döküman alıncak
    const page = Number(this.queryParams.page) || 1; // sayfa değeri 5 olduğunu varsayalım
    const limit = Number(this.queryParams.limit) || 10; // limit değeri 20 olsun
    const skip = (page - 1) * limit; // 5.sayfadakileri görmek için atlanıcak eleman 80'dir

    // veritabanına yapılcak olan isteği güncelle
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
