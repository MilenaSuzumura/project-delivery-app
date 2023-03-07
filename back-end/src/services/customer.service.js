const { Product, Sale, SaleProduct, sequelize } = require('../database/models');

const getAllProducts = async () => {
  const products = await Product.findAll();

  return { message: products };
};

const getProductById = async (id) => {
  const product = await Product.findByPk(id);

  return { message: product };
};

const createProduct = async (obj) => {
  const newProduct = await Product.create(obj);

  return { message: newProduct };
};

const updateProduct = async (id, name, price, urlImage) => {
  await Product.update({ name, price, urlImage }, { where: { id } });

  return { message: 'Product updated' };
};

const deleteProduct = async (id) => {
  await Product.destroy({ where: { id } });

  return { message: 'Product deleted' };
};

const getAllSales = async () => {
  const sales = await Sale.findAll();

  return { message: sales };
};

const getSaleById = async (id) => {
  const sale = await Sale.findByPk(id);

  return { message: sale };
};

const createSale = async ({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }, t) => {
  const newSale = await Sale.create(
    { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber },
    { transaction: t },
  );

  return newSale;
};

const createSaleProduct = async ({ products, saleId }, t) => {
  const data = products.map((product) => (
    { productId: product.productId, saleId, quantity: product.quantity }
  ));

  await SaleProduct.bulkCreate(data, { transaction: t });
};

const checkout = async (
  { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products }) => {
  const t = await sequelize.transaction();

  try {
    const newSale = await createSale(
      { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }, t,
    );

    await createSaleProduct({ products, saleId: newSale.id }, t);

    await t.commit();

    return { message: newSale.id };
  } catch (error) {
    console.log(error);
    await t.rollback();

    throw new Error('Internal server error');
  }
};

const updateSale = async (id, obj) => {
  const up = await Sale.update(obj, { where: { id } });

  return { message: up };
};

const deleteSale = async (id) => {
  await Sale.destroy({ where: { id } });

  return { message: 'Sale deleted' };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllSales,
  getSaleById,
  checkout,
  updateSale,
  deleteSale,
};
