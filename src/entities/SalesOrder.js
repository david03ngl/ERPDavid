const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const OrderItem = require('./OrderItem');

class SalesOrder extends Model {}

SalesOrder.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    confirmed: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    sequelize,
    modelName: 'SalesOrder'
});

SalesOrder.hasMany(OrderItem, { as: 'items', foreignKey: 'orderId' });
OrderItem.belongsTo(SalesOrder, { foreignKey: 'orderId' });

module.exports = SalesOrder;
