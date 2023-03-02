const { Product } = require('../database/models');

const getAll = async () => Product.findAll();

const created = async (obj) => {
  const createProduct = await Product.create(obj);
  return createProduct;
};

const getById = async (id) => {
  const byId = await Product.findByPk(id);
  return byId;
};

const updated = async (id, name, price, urlImage) => {
  const up = await Product.update({ name, price, urlImage }, { where: { id } });
  return up;
};  

const deleted = async (id) => {
  const delProduct = await Product.destroy({ where: { id } });
  return delProduct;
};

module.exports = {
  getAll,
  created,
  getById,
  updated,
  deleted,
};
