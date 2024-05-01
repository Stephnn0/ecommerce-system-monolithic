"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoute = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
class OrderRoute {
    constructor() {
        this.path = "/v1/order";
        this.router = (0, express_1.Router)();
        this.controller = new order_controller_1.OrderController();
        this.initRoute();
    }
    initRoute() {
        this.router.get(this.path + '/getAll', this.controller.getAllOrders),
            this.router.get(this.path + '/bycustomer', this.controller.getOrderByCustomer);
    }
}
exports.OrderRoute = OrderRoute;
//# sourceMappingURL=order.route.js.map