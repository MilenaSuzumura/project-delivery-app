module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
    },
    urlImage: {
      type: DataTypes.STRING(200),
    },
  },
  {
    tableName: 'products',
    timestamps: false,
    underscored: true,
  });

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct, { foreignKey: 'productId', as: 'product' });
  };

  return Product;
};
