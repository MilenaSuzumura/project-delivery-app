const customerService = require('../services/customer.service');

const getAllProducts = async (_req, res) => {
  const { message } = await customerService.getAll();

  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { message } = await customerService.getById(id);

  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { message } = await customerService.create(req.body);

  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, urlImage } = req.body;
  const { message } = await customerService.update(id, name, price, urlImage);

  return res.status(200).json({ message });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { message } = await customerService.deleteProduct(id);

  return res.status(202).json({ message });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
