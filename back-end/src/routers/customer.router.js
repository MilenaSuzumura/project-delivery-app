const express = require('express');

const customerController = require('../controllers/customer.controller');

const router = express.Router();

const productById = '/products/:id';

router.get('/orders', customerController.getOrdersByUser);
router.get('/orders/:id', customerController.getOrderById);
router.get('/products', customerController.getAllProducts);
router.get(productById, customerController.getProductById);
router.get('/sales', customerController.getAllSales);
router.get('/sales/:id', customerController.getSaleById);

router.post('/products', customerController.createProduct);
router.post('/sales', customerController.createSale);

router.put(productById, customerController.updateProduct);

router.delete(productById, customerController.deleteProduct);

module.exports = router;
