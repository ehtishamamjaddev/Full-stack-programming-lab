const Blog = require('../models/Blog');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function listPosts(req, res, next) {
  try {
    const { limit = 12, page = 1 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const filter = { published: true };
    const data = await Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    const total = await Blog.countDocuments(filter);
    res.json({ data, total });
  } catch (err) {
    next(err);
  }
}

async function getPost(req, res, next) {
  try {
    const post = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  } catch (err) {
    next(err);
  }
}

async function createPost(req, res, next) {
  try {
    const { title, excerpt, content, image, published = true } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const slug = req.body.slug || slugify(title);
    const post = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      image,
      published,
      author: req.user?.id
    });
    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
}

async function updatePost(req, res, next) {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { listPosts, getPost, createPost, updatePost, deletePost };
