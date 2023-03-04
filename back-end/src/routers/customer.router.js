const express = require('express');

const customerController = require('../controllers/customer.controller');

const router = express.Router();

const productById = '/products/:id';

router.get('/products', customerController.getAllProducts);
router.get(productById, customerController.getProductById);

router.post('/products', customerController.createProduct);

router.put(productById, customerController.updateProduct);

router.delete(productById, customerController.deleteProduct);

module.exports = router;
