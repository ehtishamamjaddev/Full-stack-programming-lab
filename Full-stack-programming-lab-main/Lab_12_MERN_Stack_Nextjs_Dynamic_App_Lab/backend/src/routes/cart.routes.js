const express = require('express');
const router = express.Router();
const { getCart, addItem, updateItem, removeItem, clearCart } = require('../controllers/cart.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, getCart);
router.post('/add', auth, addItem);
router.post('/update', auth, updateItem);
router.post('/remove', auth, removeItem);
router.delete('/clear', auth, clearCart);

module.exports = router;
