import { MySqlPool } from "../../config/mysql.config";
import { IOrder } from "../order/order.interface";
import { IAnalyticsService } from "./analytics.interface";

import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";


type ResultSet = [RowDataPacket[] | RowDataPacket[][] | ResultSetHeader, FieldPacket[]];


interface IOrderRow extends RowDataPacket {
    date: string;
    subtotal: number;
}



class AnalyticsService implements IAnalyticsService {
    async getTotalSalesRevenue(): Promise<number> {
        try {
            const pool = await MySqlPool();
            const query = 'SELECT SUM(subtotal) AS totalSales FROM orders';
            const [rows, fields] = await pool.query(query);

            if (Array.isArray(rows) && rows.length > 0 && 'totalSales' in rows[0]) {
                const { totalSales } = rows[0] as { totalSales: number };
                return parseFloat(totalSales.toString());
            } else {
                throw new Error("Failed to fetch total sales revenue: Unexpected result format.");
            }

        } catch (err) {
            console.log(err);
            throw new Error("Failed to fetch total sales revenue.");
        }
    }


    async getSalesData(): Promise<{ dates: string[], subtotals: number[] }> {
        try {
            const pool = await MySqlPool();
            const query = 'SELECT date, subtotal FROM orders';
            const [rows] = await pool.query<IOrderRow[]>(query);

            if (Array.isArray(rows) && rows.length > 0) {
                const dates: string[] = [];
                const subtotals: number[] = [];
                for (const row of rows) {
                    dates.push(row.date);
                    subtotals.push(row.subtotal);
                }
                return { dates, subtotals };
            } else {
                throw new Error("Failed to fetch sales data: No records found.");
            }
        } catch (err) {
            console.error("Error fetching sales data:", err);
            throw new Error("Failed to fetch sales data.");
        }
    }
}

export { AnalyticsService }