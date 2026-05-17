/**
 * Product Controller
 * CRUD operations for products
 * Author: M Ehtisham Amjad (231996)
 */
const Product = require('../models/Product');

async function listProducts(req, res, next) {
  try {
    const {
      q,
      category,
      minPrice,
      maxPrice,
      featured,
      popular,
      special,
      sort = 'createdAt',
      page = 1,
      limit = 12
    } = req.query;
    const filter = {};
    if (q) filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } }
    ];
    if (category) filter.category = new RegExp(`^${category}$`, 'i');
    if (minPrice) filter.price = { ...(filter.price || {}), $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };
    if (featured === 'true') filter.featured = true;
    if (popular === 'true') filter.popular = true;
    if (special === 'true') filter.special = true;

    const skip = (Number(page) - 1) * Number(limit);
    const sortField = ['price', 'name', 'createdAt', 'ratings.average'].includes(sort) ? sort : 'createdAt';
    const docs = await Product.find(filter).sort({ [sortField]: -1 }).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(filter);
    res.json({ data: docs, total });
  } catch (err) {
    next(err);
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = await Product.distinct('category');
    res.json({ categories: categories.filter(Boolean).sort() });
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate('reviews.user', 'name email');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const body = req.body;
    // ensure minimal validation
    if (!body.name || !body.price) return res.status(400).json({ message: 'Name and price required' });
    const product = await Product.create({ ...body, createdBy: req.user ? req.user.id : undefined });
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const id = req.params.id;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json({ product: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;
    const removed = await Product.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
  getProduct,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct
};
