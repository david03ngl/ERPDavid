const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');

const ProductService = require('./services/ProductService');
const SalesOrderService = require('./services/SalesOrderService');
const InvoiceService = require('./services/InvoiceService');

const app = express();
app.use(bodyParser.json());

// ===== PRODUCT =====
app.post('/products', async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const product = await ProductService.addProduct(name, price, stock);
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/products', async (req, res) => {
    const products = await ProductService.getAllProducts();
    res.json(products);
});

app.put('/products/:id', async (req, res) => {
    try {
        const product = await ProductService.updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ===== ORDER =====
app.post('/orders', async (req, res) => {
    try {
        const order = await SalesOrderService.createOrder();
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/orders/:orderId/items', async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const item = await SalesOrderService.addItem(req.params.orderId, productId, qty);
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/orders/:orderId/confirm', async (req, res) => {
    try {
        const order = await SalesOrderService.confirmOrder(req.params.orderId);
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ===== INVOICE =====
app.get('/orders/:orderId/invoice', async (req, res) => {
    try {
        const invoice = await InvoiceService.createInvoice(req.params.orderId);
        res.json(invoice);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ===== START SERVER =====
async function startServer() {
    await sequelize.sync({ force: true });
    console.log('Database synced!');
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

if (require.main === module) startServer();
module.exports = app; // untuk integration test
