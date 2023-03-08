const express = require('express');

const sellerRouter = require('../controllers/seller.controller');

const router = express.Router();

const sellerOrders = '/seller/orders';

router.get(sellerOrders, sellerRouter.getOrdersByUser);
router.get(`${sellerOrders}/:id`, sellerRouter.getOrderById);
router.get('/sellers/orders', sellerRouter.getAllSellers);
// router.update(`${sellerOrders}/:id`, sellerRouter.);

module.exports = router;
