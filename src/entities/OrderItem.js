const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const Product = require('./Product');

class OrderItem extends Model {}

OrderItem.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    qty: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
}, {
    sequelize,
    modelName: 'OrderItem'
});

OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

module.exports = OrderItem;
