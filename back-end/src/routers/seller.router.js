const express = require('express');

const sellerController = require('../controllers/seller.controller');

const router = express.Router();

router.get('/orders', sellerController.getOrdersByUser);
router.get('/orders/:id', sellerController.getOrderById);

router.patch('orders/:id', sellerController.updateOrder);

module.exports = router;
