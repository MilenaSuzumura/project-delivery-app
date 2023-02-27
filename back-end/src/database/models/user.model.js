module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, { foreignKey: 'userId', as: 'customer' });
    User.hasMany(models.Sale, { foreignKey: 'sellerId', as: 'seller' });
  };

  return User;
};
