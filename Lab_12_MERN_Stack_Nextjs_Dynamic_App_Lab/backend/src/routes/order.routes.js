const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getOrdersForUser,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/order.controller');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

router.post('/', auth, placeOrder);
router.get('/my', auth, getOrdersForUser);
router.get('/:id', auth, getOrderById);
router.get('/', auth, admin, getAllOrders);
router.put('/:id/status', auth, admin, updateOrderStatus);

module.exports = router;
