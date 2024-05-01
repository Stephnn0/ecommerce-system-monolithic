"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
class OrderController {
    constructor() {
        this.getAllOrders = async (request, response) => {
            try {
                const results = await this.orderService.getAllOrders();
                response.status(200).json(results);
            }
            catch (err) {
                console.log(err);
                response.status(500).json({ message: 'Internal server error' });
            }
        };
        this.getOrderByCustomer = async (request, response) => {
            const { customerEmail } = request.query;
            try {
                const results = await this.orderService.getOrdersByCustomer(customerEmail);
                response.status(200).json(results);
            }
            catch (err) {
                console.log(err);
                response.status(500).json({ message: 'Internal server error' });
            }
        };
        this.orderService = new order_service_1.OrderService();
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map