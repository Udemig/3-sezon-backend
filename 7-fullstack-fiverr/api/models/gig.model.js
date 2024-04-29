import { model, Schema } from 'mongoose';

const gigSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, "Lütfen kullanıcı id'sini tanımlayın"],
    },
    title: {
      type: String,
      required: [true, 'Lütfen title tanımlayın'],
    },
    desc: {
      type: String,
      required: [true, 'Lütfen desc tanımlayın'],
    },
    avgRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Lütfen category tanımlayın'],
    },
    cover: {
      type: String,
      required: [true, 'Lütfen cover tanımlayın'],
    },
    images: {
      type: [String],
    },
    shortTitle: {
      type: String,
      required: [true, 'Lütfen shortTitle tanımlayın'],
    },
    shortDesc: {
      type: String,
      required: [true, 'Lütfen shortDesc tanımlayın'],
    },
    deliveryTime: {
      type: Number,
      required: [true, 'Lütfen deliveryTime tanımlayın'],
    },
    revisionNumber: {
      type: Number,
      required: [true, 'Lütfen deliveryTime tanımlayın'],
    },
    features: {
      type: [String],
    },
    sales: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Lütfen price tanımlayın'],
    },
  },
  {
    timestamps: true,
  }
);

export default model('Gig', gigSchema);
