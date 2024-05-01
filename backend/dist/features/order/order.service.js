"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const sqlstring_1 = require("sqlstring");
const mysql_config_1 = require("../../config/mysql.config");
const uuid_1 = require("uuid");
class OrderService {
    async createOrder(customerId, metadata) {
        try {
            const cusEmail = customerId;
            const productsIds = metadata;
            console.log(productsIds, 'metadata');
            const parse = JSON.parse(productsIds['cart']);
            console.log(parse, 'parse');
            const subtotal = productsIds['subtotal'];
            console.log(subtotal, 'subtotal');
            const orderId = (0, uuid_1.v4)();
            const date = new Date().toISOString().slice(0, 10);
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = 'INSERT INTO orders (orderId , subtotal, status, date, customerEmail) VALUES (?, ?, ?, ?, ?)';
            const placeholder = [orderId, subtotal, 'new', date, cusEmail];
            const sqlFormat = (0, sqlstring_1.format)(rawSql, placeholder);
            const resultCreatePost = await pool.query(sqlFormat);
            console.log('------- finished ------------');
            for (const item of parse) {
                await this.createOrderItem(orderId, item);
            }
            return { id: resultCreatePost[0].insertId };
        }
        catch (err) {
            console.log(err);
            throw new Error("Method not implemented.");
        }
    }
    async createOrderItem(orderId, productId) {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = 'INSERT INTO orderitem (orderId, productId) VALUES (?, ?)';
            const placeholder = [orderId, productId];
            const sqlFormat = (0, sqlstring_1.format)(rawSql, placeholder);
            const result = await pool.query(sqlFormat);
            return {
                id: result[0].insertId,
                orderId,
                productId
            };
        }
        catch (err) {
            console.log(err);
            throw new Error('Failed to create order item.');
        }
    }
    async getAllOrders() {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = "SELECT * FROM orders";
            const resultGetNotes = await pool.query(rawSql);
            return resultGetNotes[0];
        }
        catch (err) {
            console.log(err);
        }
    }
    async getOrdersByCustomer(customer) {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = "SELECT * FROM orders WHERE customerEmail = ?";
            const resultGetProducts = await pool.query(rawSql, [customer]);
            return resultGetProducts[0];
        }
        catch (err) {
            console.error("Error fetching products by category:", err);
            throw new Error("Error fetching products by category");
        }
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map