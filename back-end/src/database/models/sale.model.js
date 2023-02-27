module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
    },
    deliveryNumber: {
      type: DataTypes.STRING(50),
    },
    saleDate: {
      type: DataTypes.DATE(200),
    },
    status: {
      type: DataTypes.STRING(50),
    },
  },
  {
    timestamps: false,
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'customer' });
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
  };

  return Sale;
};
