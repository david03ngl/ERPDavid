const SalesOrder = require('../entities/SalesOrder');
const OrderItem = require('../entities/OrderItem');
const Product = require('../entities/Product');

class SalesOrderService {
    static async createOrder() {
        return await SalesOrder.create({
            date: new Date(),
            confirmed: false
        });
    }    

    static async addItem(orderId, productId, qty) {
        const order = await SalesOrder.findByPk(orderId);
        if (!order) throw new Error('Order not found');

        const product = await Product.findByPk(productId);
        if (!product) throw new Error('Product not found');
        if (qty > product.stock) throw new Error('Insufficient stock');

        return await OrderItem.create({
            orderId,
            productId,
            qty,
            price: product.price
        });
    }

    static async confirmOrder(orderId) {
        const order = await SalesOrder.findByPk(orderId, { include: ['items'] });
        if (!order) throw new Error('Order not found');

        for (let item of order.items) {
            const product = await Product.findByPk(item.productId);
            if (item.qty > product.stock) throw new Error('Insufficient stock');
            product.stock -= item.qty;
            await product.save();
        }

        order.confirmed = true;
        await order.save();
        return order;
    }
}

module.exports = SalesOrderService;
