import { MySqlPool } from "../../config/mysql.config";
import {  IProduct, IProductByCategory, IProductCreate, IProductService } from "./product.interface";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { format } from "sqlstring";


type ResultSet = [RowDataPacket[] | RowDataPacket[][] | ResultSetHeader, FieldPacket[]];



class ProductService implements IProductService {
    async getCartProducts(ids: string[]) {
        try {
            const pool = await MySqlPool();
            const placeholders = ids.map(() => '?').join(',');
            const rawSql: string = `SELECT * FROM products WHERE id IN (${placeholders})`;

            const resultGetNotes: ResultSet = await pool.query(rawSql, ids);
            return resultGetNotes[0];
        } catch (err) {
            console.error(err);
            throw new Error('Error fetching products by IDs');
        }
    }




    async updateProduct() {
        throw new Error("Method not implemented.");
    }



    async deleteProduct(productId: number) {
        try {
            const pool = await MySqlPool();
            const rawSql = "DELETE FROM products WHERE id=?"
            const placeholder = [productId];
            const sqlFormat: string = format(rawSql, placeholder);
            const resultUpdatePost: ResultSet = await pool.query(sqlFormat);
            return { id: productId, message: "post deleted" };
          } catch (error: unknown) {
            console.log("err")
        }
    }
    
    async getSingleProduct(productId: number) {
        const pool = await MySqlPool();
        const rawSql: string = "SELECT * FROM products WHERE id=?"
        const placeholder: Array<number> = [productId];
        const sqlFormat: string = format(rawSql, placeholder);
        const resultPoolQuery: ResultSet = await pool.query(sqlFormat);
        if ((resultPoolQuery[0] as Array<any>).length > 0) {
          const [resultGetPostById]: any = (resultPoolQuery[0] as Array<any>).flat();
          return resultGetPostById;
        } else {
          console.log("err")
        }
        
    }

    async getProductsByCategory(category: string) {
        try {
            const pool = await MySqlPool();
            const rawSql: string = "SELECT * FROM products WHERE category = ?";
            const resultGetProducts: ResultSet = await pool.query(rawSql, [category]);
            return resultGetProducts[0];
          } catch (err) {
            console.error("Error fetching products by category:", err);
            throw new Error("Error fetching products by category");
          }
    }
    async getAllProducts() {
        try {
            const pool = await MySqlPool();
            const rawSql: string = "SELECT * FROM products"
            const resultGetNotes: ResultSet = await pool.query(rawSql);
            return resultGetNotes[0];

        } catch(err){
            console.log(err)
        }
    }
    async createProduct(product: IProductCreate): Promise<IProduct> {
        try {
            console.log("hit--create")
            const pool = await MySqlPool();
            const rawSql = 'INSERT INTO products (title, description, category, price, quantity, awsUrl) VALUES (?, ?, ?, ?, ?, ?)'
            const placeholder = [product.title, product.description, product.category, product.price, product.quantity, product.awsUrl];
            const sqlFormat: string = format(rawSql, placeholder);
            const resultCreatePost: ResultSet = await pool.query(sqlFormat);
            return { id: (resultCreatePost[0] as ResultSetHeader).insertId, ...product };
        } catch(err){
            console.error('Error registering product:', err); 
            throw new Error('Failed to register user');
        }

    }

}


export { ProductService }