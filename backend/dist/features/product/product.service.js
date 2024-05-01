"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const mysql_config_1 = require("../../config/mysql.config");
const sqlstring_1 = require("sqlstring");
class ProductService {
    async getCartProducts(ids) {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const placeholders = ids.map(() => '?').join(',');
            const rawSql = `SELECT * FROM products WHERE id IN (${placeholders})`;
            const resultGetNotes = await pool.query(rawSql, ids);
            return resultGetNotes[0];
        }
        catch (err) {
            console.error(err);
            throw new Error('Error fetching products by IDs');
        }
    }
    async updateProduct() {
        throw new Error("Method not implemented.");
    }
    async deleteProduct(productId) {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = "DELETE FROM products WHERE id=?";
            const placeholder = [productId];
            const sqlFormat = (0, sqlstring_1.format)(rawSql, placeholder);
            const resultUpdatePost = await pool.query(sqlFormat);
            return { id: productId, message: "post deleted" };
        }
        catch (error) {
            console.log("err");
        }
    }
    async getSingleProduct(productId) {
        const pool = await (0, mysql_config_1.MySqlPool)();
        const rawSql = "SELECT * FROM products WHERE id=?";
        const placeholder = [productId];
        const sqlFormat = (0, sqlstring_1.format)(rawSql, placeholder);
        const resultPoolQuery = await pool.query(sqlFormat);
        if (resultPoolQuery[0].length > 0) {
            const [resultGetPostById] = resultPoolQuery[0].flat();
            return resultGetPostById;
        }
        else {
            console.log("err");
        }
    }
    async getProductsByCategory(category) {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = "SELECT * FROM products WHERE category = ?";
            const resultGetProducts = await pool.query(rawSql, [category]);
            return resultGetProducts[0];
        }
        catch (err) {
            console.error("Error fetching products by category:", err);
            throw new Error("Error fetching products by category");
        }
    }
    async getAllProducts() {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = "SELECT * FROM products";
            const resultGetNotes = await pool.query(rawSql);
            return resultGetNotes[0];
        }
        catch (err) {
            console.log(err);
        }
    }
    async createProduct(product) {
        try {
            console.log("hit--create");
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = 'INSERT INTO products (title, description, category, price, quantity, awsUrl) VALUES (?, ?, ?, ?, ?, ?)';
            const placeholder = [product.title, product.description, product.category, product.price, product.quantity, product.awsUrl];
            const sqlFormat = (0, sqlstring_1.format)(rawSql, placeholder);
            const resultCreatePost = await pool.query(sqlFormat);
            return { id: resultCreatePost[0].insertId, ...product };
        }
        catch (err) {
            console.error('Error registering product:', err);
            throw new Error('Failed to register user');
        }
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map