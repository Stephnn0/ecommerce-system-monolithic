"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRoute = void 0;
const express_1 = require("express");
const analytics_controller_1 = require("./analytics.controller");
class AnalyticsRoute {
    constructor() {
        this.path = "/v1/analytics";
        this.router = (0, express_1.Router)();
        this.controller = new analytics_controller_1.AnalyticsController();
        this.initRoute();
    }
    initRoute() {
        this.router.get(this.path + '/totalsales', this.controller.getTotalSalesRevenue),
            this.router.get(this.path + '/salesData', this.controller.getSalesData);
    }
}
exports.AnalyticsRoute = AnalyticsRoute;
//# sourceMappingURL=analytics.route.js.map