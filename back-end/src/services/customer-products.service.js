const { Product } = require('../database/models');

const getAll = async () => Product.findAll();

module.exports = { getAll };
