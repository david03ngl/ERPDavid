const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const SalesOrder = require('./SalesOrder');

class Invoice extends Model {}

Invoice.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subtotal: { type: DataTypes.FLOAT, allowNull: false },
    tax: { type: DataTypes.FLOAT, allowNull: false },
    total: { type: DataTypes.FLOAT, allowNull: false }
}, {
    sequelize,
    modelName: 'Invoice'
});

Invoice.belongsTo(SalesOrder, { foreignKey: 'orderId' });
SalesOrder.hasOne(Invoice, { foreignKey: 'orderId' });

module.exports = Invoice;
