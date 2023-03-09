const express = require('express');

const sellerController = require('../controllers/seller.controller');

const router = express.Router();

router.get('/orders', sellerController.getAllOrders);
router.get('/orders/:id', sellerController.getOrderById);

router.patch('/orders/:id', sellerController.updateOrder);

router.post('/orders', sellerController.getOrderBySeller);

module.exports = router;
