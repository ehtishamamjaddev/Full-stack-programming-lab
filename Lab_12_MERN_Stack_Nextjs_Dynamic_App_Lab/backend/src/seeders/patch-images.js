/**
 * Updates existing products/blogs to local /images/* paths without wiping users/orders
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Blog = require('../models/Blog');

const IMG = {
  chair: '/images/chair.jpg',
  chair2: '/images/chair-2.jpg',
  table: '/images/table.jpg',
  bed: '/images/bed.jpg',
  cabinet: '/images/cabinet.jpg',
  bookcase: '/images/bookcase.jpg',
  box: '/images/box.jpg',
  living: '/images/living.jpg',
  dining: '/images/dining.jpg',
  console: '/images/console.jpg',
  office: '/images/office.jpg',
  blogWood: '/images/blog-wood.jpg',
  blogDining: '/images/blog-dining.jpg'
};

const BY_CATEGORY = {
  Chairs: IMG.chair,
  Beds: IMG.bed,
  Tables: IMG.table,
  Cabinets: IMG.cabinet,
  Bookcases: IMG.bookcase,
  Boxes: IMG.box
};

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const products = await Product.find();
  for (const p of products) {
    const local = BY_CATEGORY[p.category] || IMG.living;
    p.images = [local];
    await p.save();
  }
  const blogs = await Blog.find();
  const blogImgs = [IMG.blogWood, IMG.blogDining, IMG.living];
  for (let i = 0; i < blogs.length; i++) {
    blogs[i].image = blogImgs[i % blogImgs.length];
    await blogs[i].save();
  }
  console.log('Patched', products.length, 'products and', blogs.length, 'blog posts');
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
