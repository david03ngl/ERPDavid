require('../src/entities/Product');
require('../src/entities/SalesOrder');
require('../src/entities/OrderItem');
require('../src/entities/Invoice');

const sequelize = require('../src/db');
const ProductService = require('../src/services/ProductService');
const SalesOrderService = require('../src/services/SalesOrderService');
const InvoiceService = require('../src/services/InvoiceService');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

describe('ERP Unit Test', () => {
    let product1, product2, order;

    test('Tambah produk', async () => {
        product1 = await ProductService.addProduct('Laptop', 1000, 10);
        product2 = await ProductService.addProduct('Mouse', 50, 5);

        expect(product1.name).toBe('Laptop');
        expect(product2.stock).toBe(5);
    });

    test('Buat order dan tambah item berhasil', async () => {
        order = await SalesOrderService.createOrder();
        const item1 = await SalesOrderService.addItem(order.id, product1.id, 2);
        const item2 = await SalesOrderService.addItem(order.id, product2.id, 3);

        expect(item1.qty).toBe(2);
        expect(item2.price).toBe(50);
    });

    test('Order gagal karena stok tidak cukup', async () => {
        await expect(SalesOrderService.addItem(order.id, product2.id, 10))
            .rejects
            .toThrow('Insufficient stock');
    });

    test('Konfirmasi order mengurangi stok', async () => {
        await SalesOrderService.confirmOrder(order.id);
        const updatedProduct1 = await ProductService.updateProduct(product1.id, {});
        const updatedProduct2 = await ProductService.updateProduct(product2.id, {});

        expect(updatedProduct1.stock).toBe(8);
        expect(updatedProduct2.stock).toBe(2);
    });

    test('Generate invoice perhitungan benar', async () => {
        const invoice = await InvoiceService.createInvoice(order.id);
        expect(invoice.subtotal).toBe(2*1000 + 3*50); // 2150
        expect(invoice.tax).toBeCloseTo(2150*0.1);   // 215
        expect(invoice.total).toBeCloseTo(2365);     // 2365
    });
});
