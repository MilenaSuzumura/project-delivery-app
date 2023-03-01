const express = require('express');

const customerProductsController = require('../controllers/customer-products.controller');

const router = express.Router();

router.get('/customer/products', customerProductsController.getAll);

module.exports = router;
