import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { USER_QUERY } from "./user.query";
import { IUserService, IUserRegister, IUserLogin, IUpdateRefreshToken } from "./user.interface";
import { MySqlPool } from "../../config/mysql.config";
import { format } from "sqlstring";


type ResultSet = [RowDataPacket[] | RowDataPacket[][] | ResultSetHeader, FieldPacket[]];


class UserService implements IUserService {

    async findUserByEmail(note: IUserLogin) {
        try {
            const pool = await MySqlPool();
            const rawSql: string = 'SELECT * FROM users WHERE email = ?'
            const placeholder: Array<string> = [note.email];
            const sqlFormat: string = format(rawSql, placeholder);
            const resultPoolQuery: ResultSet = await pool.query(sqlFormat);

            if ((resultPoolQuery[0] as Array<any>).length > 0) { 
                const [resultGetPostById]: any = (resultPoolQuery[0] as Array<any>).flat();
                return resultGetPostById;

            } else {
                console.error('user not found')
            }
        } catch(err){
            console.error('Error registering user:', err); // Log the error for debugging
            throw new Error('Failed to register user');
        }
    }

    async deleteRefreshToken(refreshtoken: string) { 
        try {
            const pool = await MySqlPool();
            const rawSql = 'UPDATE users SET refreshToken=NULL WHERE refreshToken=?';
            const placeholder = [refreshtoken];
            const sqlFormat: string = format(rawSql, placeholder);
            await pool.query(sqlFormat);
            return {message: "token deleted" };
          } catch (error: unknown) {
            console.error('Error registering user:', error); // Log the error for debugging
            throw new Error('Failed to register user');          }

    }


    async refreshToken(refreshtoken: string, id: string) {
        try {
            const pool = await MySqlPool();
            const rawSql: string = 'UPDATE users SET refreshToken=? WHERE id=?'
            const placeholder = [refreshtoken, id];
            const sqlFormat: string = format(rawSql, placeholder);
            const resultUpdatePost: ResultSet = await pool.query(sqlFormat);
            return refreshtoken;
        } catch(err){
            console.error('Error registering user:', err); // Log the error for debugging
            throw new Error('Failed to register user');
        }
    }

    async findUserByRefreshToken(refreshtoken: string) {
        try { 
            const pool = await MySqlPool();
            const rawSql: string = 'SELECT * FROM users WHERE refreshToken = ?'
            const placeholder: Array<string> = [refreshtoken];
            const sqlFormat: string = format(rawSql, placeholder);
            const resultPoolQuery: ResultSet = await pool.query(sqlFormat);

            if ((resultPoolQuery[0] as Array<any>).length > 0) { 
                const [resultGetPostById]: any = (resultPoolQuery[0] as Array<any>).flat();
                return resultGetPostById;

            } else {
                console.error('user not found')
            }

        } catch(err){ 
            console.error('Error registering user:', err); // Log the error for debugging
            throw new Error('Failed to register user');  
        }
    }



    async registerUser(note: IUserRegister) {
        try {
            console.log("hit--create")
            const pool = await MySqlPool();
            const rawSql = 'INSERT INTO users (email, password, refreshToken, role) VALUES (?, ?, ?, ?)'
            const placeholder = [note.email, note.password, 'none', 'user'];
            const sqlFormat: string = format(rawSql, placeholder);
            const resultCreatePost: ResultSet = await pool.query(sqlFormat);
            return { id: (resultCreatePost[0] as ResultSetHeader).insertId, ...note };

        } catch(err){
            console.error('Error registering user:', err); // Log the error for debugging
            throw new Error('Failed to register user');
        }
    }


    async getUserByPhoneOrCreate(phone: string) {
        try {
            const pool = await MySqlPool();
            const rawSql: string = USER_QUERY.SELECT_USER_BY_PHONE;
            const results: ResultSet = await pool.query(rawSql);
            if(results){
                return results //
            } else {
                return 'not user found'
            }
        } catch(err){
            console.log(err)
        }
    } 
}


export { UserService }