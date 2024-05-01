import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { IOrder, IOrderByCustomer, IOrderCreate, IOrderItem, IOrderItemCreate, IOrderService } from "./order.interface";
import { format } from "sqlstring";
import { MySqlPool } from "../../config/mysql.config";
import { v4 as uuidv4 } from 'uuid';



type ResultSet = [RowDataPacket[] | RowDataPacket[][] | ResultSetHeader, FieldPacket[]];




class OrderService implements IOrderService {
    async createOrder(customerId: any, metadata: any): Promise<IOrder> {
        try {
            const cusEmail = customerId
            const productsIds = metadata
            console.log(productsIds, 'metadata')
            const parse = JSON.parse(productsIds['cart']); 
            console.log(parse, 'parse')
            const subtotal = productsIds['subtotal']
            console.log(subtotal, 'subtotal')

            //generate order id (uuid)
            const orderId = uuidv4()

            const date = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

            //create order
            const pool = await MySqlPool();
            const rawSql = 'INSERT INTO orders (orderId , subtotal, status, date, customerEmail) VALUES (?, ?, ?, ?, ?)'
            const placeholder = [orderId, subtotal, 'new', date, cusEmail];
            const sqlFormat: string = format(rawSql, placeholder);
            const resultCreatePost: ResultSet = await pool.query(sqlFormat);

            console.log('------- finished ------------');

            for (const item of parse) {
                await this.createOrderItem(orderId, item);
              }
            
            return { id: (resultCreatePost[0] as ResultSetHeader).insertId };

        } catch(err){
          console.log(err)
          throw new Error("Method not implemented.");

        }

        
    }
    async createOrderItem(orderId: string, productId: number): Promise<IOrderItem> {
        try {
            // Insert data into your database table for order items
            const pool = await MySqlPool();
            const rawSql = 'INSERT INTO orderitem (orderId, productId) VALUES (?, ?)';
            const placeholder = [orderId, productId];
            const sqlFormat: string = format(rawSql, placeholder);
            const result: ResultSet = await pool.query(sqlFormat);
        
            return {
              id: (result[0] as ResultSetHeader).insertId,
              orderId,
              productId
            };
          } catch (err) {
            console.log(err);
            throw new Error('Failed to create order item.');
          }
    }
    async getAllOrders() {
        try {
            const pool = await MySqlPool();
            const rawSql: string = "SELECT * FROM orders"
            const resultGetNotes: ResultSet = await pool.query(rawSql);
            return resultGetNotes[0];

        } catch(err){
            console.log(err)
        }
    }
    async getOrdersByCustomer(customer: string) {
        try {
            const pool = await MySqlPool();
            const rawSql: string = "SELECT * FROM orders WHERE customerEmail = ?";
            const resultGetProducts: ResultSet = await pool.query(rawSql, [customer]);
            return resultGetProducts[0];
          } catch (err) {
            console.error("Error fetching products by category:", err);
            throw new Error("Error fetching products by category");
          }
    }
}

export { OrderService }