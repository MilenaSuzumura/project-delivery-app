const express = require('express');

const customerProductsController = require('../controllers/customer-products.controller');

const route = express.Router();
const duplicated = '/customer/products/:id';

route.get('/customer/products', customerProductsController.getAll);
route.post('/customer/products', customerProductsController.created);
route.get(duplicated, customerProductsController.getById);
route.put(duplicated, customerProductsController.updated);
route.delete(duplicated, customerProductsController.deleted);

module.exports = route;
