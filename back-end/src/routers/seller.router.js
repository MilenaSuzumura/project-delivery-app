const express = require('express');

const sellerController = require('../controllers/seller.controller');

const router = express.Router();

router.get('/orders', sellerController.getOrdersByUser);
router.get('/orders/:id', sellerController.getOrderById);

module.exports = router;
