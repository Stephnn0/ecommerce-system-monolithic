"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckRoute = void 0;
const express_1 = require("express");
const health_controller_1 = require("./health.controller");
class HealthCheckRoute {
    constructor() {
        this.path = "/health";
        this.router = (0, express_1.Router)();
        this.controller = new health_controller_1.HealthCheckController();
        this.router.get(this.path, this.controller.getHealth);
    }
}
exports.HealthCheckRoute = HealthCheckRoute;
//# sourceMappingURL=health.route.js.map