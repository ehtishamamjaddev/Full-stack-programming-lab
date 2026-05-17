const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  discountPrice: Number,
  category: String,
  subCategory: String,
  images: [String],
  stock: { type: Number, default: 0 },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  reviews: [reviewSchema],
  featured: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  special: { type: Boolean, default: false },
  sku: String,
  tags: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

productSchema.index({ category: 1, featured: 1, popular: 1, special: 1 });

module.exports = mongoose.model('Product', productSchema);
