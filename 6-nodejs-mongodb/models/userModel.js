const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// kullanıcı şemasını oluştur
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Lütfen isminizi giriniz"],
  },

  email: {
    type: String,
    required: [true, "Lütfen mail giriniz"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Lütfen geçerli bir email giriniz"],
  },

  photo: {
    type: String,
    default: "defaultpic.webp",
  },

  password: {
    type: String,
    required: [true, "Lütfen şifre giriniz"],
    minLength: [8, "Şifre en az 8 karakter içermeli"],
    validate: [validator.isStrongPassword, "Şifreniz yeteince güçlü değil"],
    select: false, // kullanıcı verisi çağrıldığında göndermediğimiz değer
  },

  passwordConfirm: {
    type: String,
    required: [true, "Lütfen şifre onayını giriniz"],
    validate: {
      validator: function (value) {
        return value == this.password;
      },
      message: "Onay şifreniz eşleşmiyor",
    },
  },

  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },

  passwordChangedAt: Date,

  passwordResetToken: String,

  passwordResetExpires: Date,
});

// Veritbanına kullanıcyı kaydetmeden önce password
// alınını şifreleme algoritmalarından geçir ve şifrele
// passwordConfirm alanını kaldır
userSchema.pre("save", async function (next) {
  // daha önce şifre hashelndiyse bu fonksiyon çalışmasın
  if (!this.isModified("password") || this.isNew) return next();

  //* Şifreyi hash ve saltla
  this.password = await bcrypt.hash(this.password, 12);

  //* Onay şifreisni kaldır
  this.passwordConfirm = undefined;
});

// Hashlenmiş şifre ile normal şifreyi karşılaştırma özelliğini bir method olarak tanımlayalım
// tanımladığımız bu method sadece user belgeleri üzerinden erişilebilir
userSchema.methods.correctPass = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

// jwt oluşturlma tarihinden sonra şifre değiştirilimiş mi kontrol et
userSchema.methods.controlPassDate = function (JWTTime) {
  if (this.passwordChangedAt && JWTTime) {
    // şifre değiştirme tarihini saniye formatına çevirme
    const changeTime = parseInt(this.passwordChangedAt.getTime() / 1000);

    // jwt şifre sıfırlandıktan önce mi oluşmmuş
    // eğer jwt verilme tarihi şifre sıfırlama tarihinden küçükse, şifre değiştirme tarihi ileri tarihlidir ve ortada sorun vardır bu yüzden true döndürür
    // jwt veirlme tarihi şifre sıfırlama tarihinden büyükse sorun yoktur false döndürür
    return JWTTime < changeTime;
  }

  return false;
};

// şifre sıfırlama tokeni oluştur
// bu token daha sonra kullanıcı mailine gönderilecek ve kullanıcı şifersini
// sıfırlarken kimliğini doğrulama maçlı bu tokeni kullanacak
// 10 dakikkalık geçerlilk süresi olucak
userSchema.methods.createPasswordResetToken = function () {
  //1) 32 byte'lık rastgele veri oluşturur ve onu hexadecimal bir diziye dönüştürür
  const resetToken = crypto.randomBytes(32).toString("hex");

  // 2) tokeni hashle ve user dökümanı içerisne ekle
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 3) tokenin son geçerlilik tarihihni kullanıcnın düökümanına ekle
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // 4) tokenin normal halini return et
  return resetToken;
};

// kullanıcı modelini oluştur
const User = model("User", userSchema);

module.exports = User;
