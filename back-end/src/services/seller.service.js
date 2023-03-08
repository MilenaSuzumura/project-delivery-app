const { Product, Sale, User } = require('../database/models');

const getOrdersByUser = async (sellerId) => {
  const orders = await Sale.findAll({ where: { sellerId } });

  return { message: orders };
};

const getOrderById = async (id) => {
  const orderById = await Sale.findByPk(
    id, { include: [{ model: Product, as: 'products' }, { model: User, as: 'seller' }] },
  );

  return { message: orderById };
};

const getAllSellers = async () => {
  const allSellers = await User.findAll({ where: { role: 'seller' }});
  return { message: allSellers };
};

module.exports = { getOrdersByUser, getOrderById, getAllSellers };
