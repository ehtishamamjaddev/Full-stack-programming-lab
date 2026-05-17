/**
 * Cart controller - manage user's cart
 */
const Cart = require('../models/Cart');
const Product = require('../models/Product');

async function populateCart(cart) {
  if (!cart) return null;
  return cart.populate('items.product');
}

async function getCart(req, res, next) {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    const populated = await populateCart(cart);
    res.json({ cart: populated || { items: [] } });
  } catch (err) {
    next(err);
  }
}

async function addItem(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (item) item.quantity += Number(quantity);
    else cart.items.push({ product: productId, quantity: Number(quantity) });

    await cart.save();
    const populated = await populateCart(cart);
    res.json({ cart: populated });
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (Number(quantity) <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    } else {
      item.quantity = Number(quantity);
    }

    await cart.save();
    const populated = await populateCart(cart);
    res.json({ cart: populated });
  } catch (err) {
    next(err);
  }
}

async function removeItem(req, res, next) {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    await cart.save();
    const populated = await populateCart(cart);
    res.json({ cart: populated });
  } catch (err) {
    next(err);
  }
}

async function clearCart(req, res, next) {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.json({ cart: { items: [] } });
    cart.items = [];
    await cart.save();
    res.json({ cart: { items: [] } });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCart, addItem, updateItem, removeItem, clearCart };
