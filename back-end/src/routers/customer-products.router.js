const express = require('express');

const customerProductsController = require('../controllers/customer-products.controller');

const route = express.Router();

route.get('/customer/products', customerProductsController.getAll);

module.exports = route;
