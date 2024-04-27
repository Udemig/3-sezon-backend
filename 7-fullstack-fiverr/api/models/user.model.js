import { Schema, model } from 'mongoose';

// Kullanıcı şemasını belirleyelim
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Lütfen username alnını belirleyin'],
      unique: [
        true,
        'Bu isimde bir kullanıcı mevcut. Lütfen faklı bir nickname belirleyin.',
      ],
    },
    email: {
      type: String,
      required: [true, 'Lütfen email alnını belirleyin'],
      unique: [
        true,
        'Bu mail adresinde bir kullanıcı mevcut. Lütfen faklı bir email belirleyin.',
      ],
    },
    password: {
      type: String,
      required: [true, 'Lütfen şifre alanını belirleyin'],
    },
    img: {
      type: String,
    },
    country: {
      type: String,
      required: [true, 'Lütfen ülke alanını belileyin'],
    },
    phone: {
      type: Number,
    },
    desc: {
      type: String,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  // ayarlar
  // timestamp sayesinde oluşturduğumuz bütün belegelere oto olarak oluşturulma ve güncellenme tarihleri eklenir
  {
    timestamps: true,
  }
);

export default model('User', userSchema);
