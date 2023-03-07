const express = require('express');

const sellerRouter = require('../controllers/seller.controller');

const router = express.Router();

router.get('/orders', sellerRouter.getOrdersByUser);
router.get('/orders/:id', sellerRouter.getOrderById);

module.exports = router;
