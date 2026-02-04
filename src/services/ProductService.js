const Product = require('../entities/Product');

class ProductService {
    static async addProduct(name, price, stock=0) {
        return await Product.create({ name, price, stock });
    }

    static async updateProduct(id, data) {
        const product = await Product.findByPk(id);
        if (!product) throw new Error('Product not found');
        return await product.update(data);
    }

    static async getAllProducts() {
        return await Product.findAll();
    }

    static async adjustStock(id, qty) {
        const product = await Product.findByPk(id);
        if (!product) throw new Error('Product not found');
        if (product.stock + qty < 0) throw new Error('Insufficient stock');
        product.stock += qty;
        await product.save();
        return product;
    }
}

module.exports = ProductService;
