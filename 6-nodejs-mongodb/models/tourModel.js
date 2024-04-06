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

// hiçbir rapora gizli olanları dahil etme
tourSchema.pre('aggregate', function (next) {
  // raporun ilk adımını belirle
  this.pipeline().unshift({ $match: { secret: { $ne: true } } });

  next();
});

//! Model
// Model şemadaki kısıtlmara göre kollekisyona yeni veri ekleme çıkarama kolleksiyondan veri alma gibi işlemleri yapmamıza olanak sağlar
const Tour = model('Tour', tourSchema);

// tur modelini farklı dosylarda kullanbilmek için export ediyoruz
module.exports = Tour;
