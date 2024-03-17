const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// kullanıcı şemasını oluştur
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Lütfen isminizi giriniz'],
  },

  email: {
    type: String,
    required: [true, 'Lütfen mail giriniz'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Lütfen geçerli bir email giriniz'],
  },

  photo: {
    type: String,
    default: 'defaultpic.webp',
  },

  password: {
    type: String,
    required: [true, 'Lütfen şifre giriniz'],
    minLength: [8, 'Şifre en az 8 karakter içermeli'],
    validate: [validator.isStrongPassword, 'Şifreniz yeteince güçlü değil'],
    select: false, // kullanıcı verisi çağrıldığında göndermediğimiz değer
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Lütfen şifre onayını giriniz'],
    validate: {
      validator: function (value) {
        return value == this.password;
      },
      message: 'Onay şifreniz eşleşmiyor',
    },
  },

  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Veritbanına kullanıcyı kaydetmeden önce password
// alınını şifreleme algoritmalarından geçir ve şifrele
// passwordConfirm alanını kaldır
userSchema.pre('save', async function () {
  //* Şifreyi hash ve saltla
  this.password = await bcrypt.hash(this.password, 12);

  //* Onay şifreisni kaldır
  this.passwordConfirm = undefined;
});

// kullanıcı modelini oluştur
const User = model('User', userSchema);

module.exports = User;
