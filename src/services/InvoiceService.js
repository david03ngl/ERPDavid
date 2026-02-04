const Invoice = require('../entities/Invoice');
const SalesOrder = require('../entities/SalesOrder');

class InvoiceService {
    static async createInvoice(orderId) {
        const order = await SalesOrder.findByPk(orderId, { include: ['items'] });
        if (!order) throw new Error('Order not found');
        if (!order.confirmed) throw new Error('Order must be confirmed');

        let subtotal = 0;
        for (let item of order.items) {
            subtotal += item.qty * item.price;
        }
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        return await Invoice.create({
            orderId,
            subtotal,
            tax,
            total
        });
    }
}

module.exports = InvoiceService;
