const express = require('express');

const customerProductsController = require('../controllers/customer-products.controller');

const router = express.Router();

const idRoute = '/customer/products/:id';

router.get('/customer/products', customerProductsController.getAll);
router.get(idRoute, customerProductsController.getById);

router.post('/customer/products', customerProductsController.create);

router.put(idRoute, customerProductsController.update);

router.delete(idRoute, customerProductsController.deleteProduct);

module.exports = router;
