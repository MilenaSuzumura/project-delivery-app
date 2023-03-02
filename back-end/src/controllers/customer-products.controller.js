const customerProductsService = require('../services/customer-products.service');

const getAll = async (_req, res) => {
  const { message } = await customerProductsService.getAll();

  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { message } = await customerProductsService.getById(id);

  return res.status(200).json(message);
};

const create = async (req, res) => {
  const { message } = await customerProductsService.create(req.body);

  return res.status(201).json(message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, price, urlImage } = req.body;
  const { message } = await customerProductsService.update(id, name, price, urlImage);

  return res.status(200).json({ message });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { message } = await customerProductsService.deleteProduct(id);

  return res.status(202).json({ message });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};
