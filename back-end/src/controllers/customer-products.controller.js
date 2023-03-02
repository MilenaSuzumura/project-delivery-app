const customerProductsService = require('../services/customer-products.service');

const getAll = async (_req, res) => {
  const productsAll = await customerProductsService.getAll();
  return res.status(200).json(productsAll);
};

const created = async (req, res) => {
  const createProduct = await customerProductsService.created(req.body);
  return res.status(201).json(createProduct);
};

const getById = async (req, res) => {
  const productId = await customerProductsService.getById(req.params.id);
  return res.status(200).json(productId);
};

const updated = async (req, res) => {
  const up = customerProductsService.updated(req.params.id);
  return res.status(200).json(up);
};

const deleted = async (req, res) => {
  const delProduct = await customerProductsService.deleted(req.params.id);
  return res.status(204).json(delProduct);
};

module.exports = {
  getAll,
  created,
  getById,
  updated,
  deleted,
};
