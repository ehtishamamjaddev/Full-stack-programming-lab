const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/blog.controller');

router.get('/', listPosts);
router.get('/:slug', getPost);
router.post('/', auth, admin, createPost);
router.put('/:id', auth, admin, updatePost);
router.delete('/:id', auth, admin, deletePost);

module.exports = router;
