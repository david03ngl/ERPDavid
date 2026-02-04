const request = require('supertest');
const app = require('../src/index');
const sequelize = require('../src/db');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

describe('ERP REST API Integration Test', () => {
    let product1, product2, order;

    test('Tambah produk', async () => {
        const res1 = await request(app).post('/products').send({ name: 'Laptop', price: 1000, stock: 10 });
        const res2 = await request(app).post('/products').send({ name: 'Mouse', price: 50, stock: 5 });

        expect(res1.statusCode).toBe(200);
        expect(res1.body.name).toBe('Laptop');
        product1 = res1.body;
        product2 = res2.body;
    });

    test('Buat order', async () => {
        const res = await request(app).post('/orders');
        expect(res.statusCode).toBe(200);
        order = res.body;
    });

    test('Tambah item ke order', async () => {
        const res1 = await request(app).post(`/orders/${order.id}/items`).send({ productId: product1.id, qty: 2 });
        const res2 = await request(app).post(`/orders/${order.id}/items`).send({ productId: product2.id, qty: 3 });
        expect(res1.statusCode).toBe(200);
        expect(res2.statusCode).toBe(200);
    });

    test('Tambah item gagal jika stok tidak cukup', async () => {
        const res = await request(app).post(`/orders/${order.id}/items`).send({ productId: product2.id, qty: 10 });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Insufficient stock');
    });

    test('Konfirmasi order', async () => {
        const res = await request(app).post(`/orders/${order.id}/confirm`);
        expect(res.statusCode).toBe(200);
        expect(res.body.confirmed).toBe(true);
    });

    test('Generate invoice', async () => {
        const res = await request(app).get(`/orders/${order.id}/invoice`);
        expect(res.statusCode).toBe(200);
        expect(res.body.total).toBeCloseTo(2365);
    });
});
