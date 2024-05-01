"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const mysql_config_1 = require("../../config/mysql.config");
class AnalyticsService {
    async getTotalSalesRevenue() {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const query = 'SELECT SUM(subtotal) AS totalSales FROM orders';
            const [rows, fields] = await pool.query(query);
            if (Array.isArray(rows) && rows.length > 0 && 'totalSales' in rows[0]) {
                const { totalSales } = rows[0];
                return parseFloat(totalSales.toString());
            }
            else {
                throw new Error("Failed to fetch total sales revenue: Unexpected result format.");
            }
        }
        catch (err) {
            console.log(err);
            throw new Error("Failed to fetch total sales revenue.");
        }
    }
    async getSalesData() {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const query = 'SELECT date, subtotal FROM orders';
            const [rows] = await pool.query(query);
            if (Array.isArray(rows) && rows.length > 0) {
                const dates = [];
                const subtotals = [];
                for (const row of rows) {
                    dates.push(row.date);
                    subtotals.push(row.subtotal);
                }
                return { dates, subtotals };
            }
            else {
                throw new Error("Failed to fetch sales data: No records found.");
            }
        }
        catch (err) {
            console.error("Error fetching sales data:", err);
            throw new Error("Failed to fetch sales data.");
        }
    }
}
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=analytics.service.js.map