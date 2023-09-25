import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
    unique: false,
  },
  image: { type: Buffer },
});

const productDb = mongoose.model('products', productSchema);

export default productDb;
