import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { format } from "sqlstring";
import { IPageService } from "./pages.interface";
import { MySqlPool } from "../../config/mysql.config";


type ResultSet = [RowDataPacket[] | RowDataPacket[][] | ResultSetHeader, FieldPacket[]];



class PageService implements IPageService {
    async getSinglePage(pageId: string) {
        try {
            const pool = await MySqlPool();
            const rawSql: string = "SELECT * FROM pages WHERE id=?"
            const placeholder: Array<string> = [pageId];
            const sqlFormat: string = format(rawSql, placeholder);
            const resultPoolQuery: ResultSet = await pool.query(sqlFormat);
            if ((resultPoolQuery[0] as Array<any>).length > 0) {
              const [resultGetPostById]: any = (resultPoolQuery[0] as Array<any>).flat();
              return resultGetPostById;
            } else {
                throw new Error("Error fetching pages by category");   
                 }

        } catch(err){
            console.error("Error fetching pages by id:", err);
            throw new Error("Error fetching pages by id");   

        }
 
    }
}


export {PageService  }