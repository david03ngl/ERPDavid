const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Product extends Model {}

Product.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    sequelize,
    modelName: 'Product'
});

module.exports = Product;
