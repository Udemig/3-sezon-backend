const { Schema, model } = require('mongoose');
const validator = require('validator');

//! Şema | Şablon | Kalıp
//* Veri tabanına ekleceğimiz dökümanın hangi değerlere ve hangi tipteki verilere sahip olmasını belirldiğimiz. varsayılan değerini benzersiz olma durmunu + verinin kaydedilmeden önce dğişmesi gereken alnlarını belirlediğimiz yapı.
//* Şemaları fırınlardaki kalıplara benzetebiliriz çünkü şemlardan çıkıcak olan her ürün birbirinin benzeri olucak.
const tourSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, 'İsim değeri benzersiz olmalı'],
      required: [true, 'Tur mutlaka isim alanına sahip olmalıdır'],
      minLength: [10, 'Tur ismi en az 10 karakter olmalı'],
      maxLength: [40, 'Tur ismi en fazla 50 karakter olabilir'],
      validate: [
        validator.isAlpha, // validator kütüphanesindeki doğrulama ofnksiyonunu kullandık
        'İsimde sadece alfabetik karakterler içermeli',
      ],
    },

    duration: {
      type: Number,
      required: [true, 'Tur mutlaka duration alanına sahip olmalıdır'],
    },

    maxGroupSize: {
      type: Number,
      required: [true, 'Tur mutlaka duration alanına sahip olmalıdır'],
    },

    difficulty: {
      type: String,
      required: [true, 'Tur mutlaka difficulty alanına sahip olmalıdır'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Zorluk derecesi geçrli değil',
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.0, //  tur oluştururken ratingi söylemesek de 4 olarak kaydedilecek
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, 'Tur mutlaka fiyat değerine sahip olmalıdır'],
    },

    priceDiscount: {
      type: Number,
      // custom validator (kendi yazdığımız doğrulayıcılar)
      // indirim değeri fiyatttan düşükse geçerli değilse geçersizdir
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: 'İndirim fiyatı asıl fiyattan büyük olamaz',
      },
    },

    summary: {
      type: String,
      trim: true, // kaydedilen verinin baş ve sonundaki boşlukları siler
      maxLength: [1000, 'Tur açıklaması en fazla 1000 karakter olabilir'],
      required: [true, 'Tur mutlaka summary değerine sahip olmalıdır'],
    },

    description: {
      type: String,
      trim: true,
      maxLength: 2000,
    },

    imageCover: {
      type: String,
      required: [true, 'Tur mutlaka imageCover değerine sahip olmalıdır'],
    },

    images: [String], // Metinlerden oluşan bir dizi

    startDates: [Date], // Tarihlerde oluşan bir dizi

    createdAt: {
      type: Date,
      default: Date.now(), // varsayılan olarak bugünün tarihini ekle
    },

    hour: Number,

    // başlangıç noktası
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      description: String,
      coordinates: [Number],
      adress: String,
    },

    //* EMBEDDING
    //* Turun ziyaret noktaları dizi olarak tanımlanmalı
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        description: String,
        day: Number,
      },
    ],

    //* Child Refferance
    //* Turun ilgili reheberleri kullanıcların dizisindeki id'leri ile referans gösterilmeli
    guides: [
      {
        type: Schema.ObjectId, // referans tanımında tip herzaman ObjectId'dir
        ref: 'User', // hangi model ile tanımlanmış verinin referansını aldığımızı belirtiyoruz
      },
    ],
  },

  // şema ayarları (sanal değrleri aktif ettik)
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//! INDEX
// Turları alırken fiyat ve rating ortalamasına göre filtre yapan kullanıcılara index sayesinde artık çok daha hızlı bir şekilde cevap vericez. Index yapılan değerler veritabanında belirlediğimiz yöne göre sırlanır ve sıralanmış hali saklanır (belirli bir alan kaplar) ve bu değere göre filtreleme yapıldığında mongodbnin, veriler zaten sıralı olduğu için bütün dökümanları kontrol etmesine gerek kalmaz sadece bulunan sayıda döküman incelenir bu sayede yüklenmesi süresini azaltırız
tourSchema.index({ price: 1, ratingsAverage: -1 });

// coğrafi ver iiçin indexleme
tourSchema.index({ startLocation: '2dsphere' });

//! Virtual Property (Sanal Değer)
// Veri tabanında tutmamıza değmeyecek ama client tarafından
// yapılan isteklerde göndermemiz gereken verileri veri tabanında tutmayıp
// client'a gönderirken hesaplama işlemidir
// normal function kullanmamımızn sebebi this anahtar kelimesine eişim
// this araclığı ile turların değerlerine erişebiliyoruz
// fonksiyon hesaplama sonucu return edilen veri eklenicek olan sanal değer olur
tourSchema.virtual('slug').get(function () {
  return this.name.toLowerCase().replace(/ /g, '-');
});

//! Vırtual Populate
// normalde yorumları parent refferance ile turlara bağlamıştı ama bu yüzden turları aldığımız zaman o tura ait olan yorumlara erişemiyoruz.
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour', // dökümanın hangi alanına göre referans alıcaz
  localField: '_id', // diğer dökümandaki alanın mevcut dökümandaki karşılığı olan alna
});

//! Document Middlware
// Middleware, iki olay arasında çalışan yapı
// ör: verinin alınıp veritbanına kaydedilmesi sırasında
tourSchema.pre('save', function (next) {
  // veirtabanın kaydedilmek üzere olan veriye yeni değer ekledik
  this.hour = this.duration * 24;

  // sonraki adıma geçiş izni
  next();
});

// fonksiyonu sadece bir işlemden önce değil sonrada çalıştırabiliyoruz
tourSchema.post('updateOne', function (doc, next) {
  console.log('kaydedilen döküman', doc);
  //ör: kullanıcı yeni bir rapor oluşturduktan hemen sobnra bu ay rapor sayısı + 1
  //ör: kullanıcı yeni bir hesap oluşturktan hemen sonra mail göndermek isteyebilirz
  //ör: kullanıcı şifresini güncelldiğinde şifre değiştirmem maili gönderilebilir

  next();
});

//! Query Middleware (Sorgu Arayazılımı)
// sorgulardan önce veya sonra devreye giren arayazılımlar
tourSchema.pre(/^find/, async function (next) {
  // find isteklerinde secret değeri tru olanları aradan çıkar
  this.find({ secret: { $ne: true } });

  next();
});

//! Populate
// sorgulardan önce middleware ile populate'i tanımlarız.
// Mongodb'de populate bir belgedeki belirli bir alnın o alana referans verien diğer bir kolleksiyondaki belgelerle dolduruluması anlamına gelir. Yani populating, referansları gerçek verilerle doldurmayı sağlar.
tourSchema.pre(/^find/, function (next) {
  this.populate({
    // doldurulması gereken alanın ismi
    path: 'guides',
    //doldururken istemediğimiz alanlar
    select: '-__v -passwordResetToken -passwordResetExpires',
  });

  next();
});

// hiçbir rapora gizli olanları dahil etme
tourSchema.pre('aggregate', function (next) {
  // raporun ilk adımını belirle
  this.pipeline().push({ $match: { secret: { $ne: true } } });

  next();
});

//! Model
// Model şemadaki kısıtlmara göre kollekisyona yeni veri ekleme çıkarama kolleksiyondan veri alma gibi işlemleri yapmamıza olanak sağlar
const Tour = model('Tour', tourSchema);

// tur modelini farklı dosylarda kullanbilmek için export ediyoruz
module.exports = Tour;
