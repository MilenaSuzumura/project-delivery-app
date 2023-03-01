const customerProductsService = require('../services/customer-products.service');

const getAll = async (req, res) => {
  const productsAll = await customerProductsService.getAll();
  return res.status(200).json(productsAll);
};

module.exports = { getAll };
