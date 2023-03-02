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

// const updated = async (id) => {
//   const byId = await Product.findByPk(id);
//   if (!byId) {
//     throw new Error({ message: 'Not exist' });
//   } else {
//     await byId.update({ name, price, urlImage }, { where: { id } });
//   }
  
// };

const deleted = async (id) => {
  const delProduct = await Product.destroy({ where: { id } });
  return delProduct;
};

module.exports = {
  getAll,
  created,
  getById,
  // updated,
  deleted,
};
