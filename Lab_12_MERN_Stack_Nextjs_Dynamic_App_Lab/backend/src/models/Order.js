const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: String,
  productImage: String,
  sku: String,
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: Number,
  discountPrice: Number,
  lineTotal: Number
});

const shippingAddressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  street: String,
  city: String,
  province: String,
  postalCode: String,
  country: { type: String, default: 'Pakistan' }
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerEmail: String,
  customerName: String,
  customerPhone: String,
  items: [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  subtotal: Number,
  shippingCost: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: { type: String, enum: ['cash_on_delivery', 'card', 'bank_transfer'], default: 'cash_on_delivery' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  notes: String,
  trackingNumber: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
