const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');

function genOrderNumber() {
  return 'RP-' + Date.now().toString(36).toUpperCase();
}

function unitPrice(product) {
  return product.discountPrice && product.discountPrice < product.price
    ? product.discountPrice
    : product.price;
}

async function placeOrder(req, res, next) {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod, notes, shippingCost = 1500 } = req.body;

    const user = await User.findById(userId);
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    const items = cart.items.map((i) => {
      const price = unitPrice(i.product);
      return {
        product: i.product._id,
        productName: i.product.name,
        productImage: i.product.images?.[0] || '',
        sku: i.product.sku || '',
        quantity: i.quantity,
        unitPrice: price,
        discountPrice: i.product.discountPrice,
        lineTotal: price * i.quantity
      };
    });

    const subtotal = items.reduce((s, it) => s + it.lineTotal, 0);
    const discountAmount = cart.items.reduce((s, i) => {
      const p = i.product;
      if (p.discountPrice && p.discountPrice < p.price) {
        return s + (p.price - p.discountPrice) * i.quantity;
      }
      return s;
    }, 0);
    const taxAmount = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + Number(shippingCost) + taxAmount;

    const order = await Order.create({
      orderNumber: genOrderNumber(),
      user: userId,
      customerEmail: user?.email,
      customerName: shippingAddress?.fullName || user?.name,
      customerPhone: shippingAddress?.phone || user?.phone,
      items,
      shippingAddress: {
        ...shippingAddress,
        country: shippingAddress?.country || 'Pakistan'
      },
      subtotal,
      shippingCost: Number(shippingCost),
      taxAmount,
      discountAmount,
      totalAmount,
      paymentMethod: paymentMethod || 'cash_on_delivery',
      paymentStatus: 'pending',
      notes
    });

    cart.items = [];
    await cart.save();

    const populated = await Order.findById(order._id).populate('items.product');
    res.status(201).json({ order: populated });
  } catch (err) {
    next(err);
  }
}

async function getOrdersForUser(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.product');
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}

async function getOrderById(req, res, next) {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id }).populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, trackingNumber, paymentStatus } = req.body;
    const update = {};
    if (status) update.status = status;
    if (trackingNumber) update.trackingNumber = trackingNumber;
    if (paymentStatus) update.paymentStatus = paymentStatus;
    const order = await Order.findByIdAndUpdate(id, update, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  placeOrder,
  getOrdersForUser,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};
