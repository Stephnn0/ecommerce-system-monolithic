"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
class AnalyticsController {
    constructor() {
        this.getTotalSalesRevenue = async (request, response) => {
            try {
                const results = await this.analyticsService.getTotalSalesRevenue();
                response.status(200).json(results);
            }
            catch (err) {
                console.log(err);
                response.status(500).json({ message: 'Internal server error' });
            }
        };
        this.getSalesData = async (request, response) => {
            try {
                const salesData = await this.analyticsService.getSalesData();
                response.status(200).json(salesData);
            }
            catch (err) {
                console.error("Error fetching sales data:", err);
                response.status(500).json({ message: 'Internal server error' });
            }
        };
        this.analyticsService = new analytics_service_1.AnalyticsService();
    }
}
exports.AnalyticsController = AnalyticsController;
//# sourceMappingURL=analytics.controller.js.map