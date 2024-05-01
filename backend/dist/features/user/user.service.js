"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_query_1 = require("./user.query");
const mysql_config_1 = require("../../config/mysql.config");
const sqlstring_1 = require("sqlstring");
class UserService {
    async findUserByEmail(note) {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = 'SELECT * FROM users WHERE email = ?';
            const placeholder = [note.email];
            const sqlFormat = (0, sqlstring_1.format)(rawSql, placeholder);
            const resultPoolQuery = await pool.query(sqlFormat);
            if (resultPoolQuery[0].length > 0) {
                const [resultGetPostById] = resultPoolQuery[0].flat();
                return resultGetPostById;
            }
            else {
                console.error('user not found');
            }
        }
        catch (err) {
            console.error('Error registering user:', err);
            throw new Error('Failed to register user');
        }
    }
    async deleteRefreshToken(refreshtoken) {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = 'UPDATE users SET refreshToken=NULL WHERE refreshToken=?';
            const placeholder = [refreshtoken];
            const sqlFormat = (0, sqlstring_1.format)(rawSql, placeholder);
            await pool.query(sqlFormat);
            return { message: "token deleted" };
        }
        catch (error) {
            console.error('Error registering user:', error);
            throw new Error('Failed to register user');
        }
    }
    async refreshToken(refreshtoken, id) {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = 'UPDATE users SET refreshToken=? WHERE id=?';
            const placeholder = [refreshtoken, id];
            const sqlFormat = (0, sqlstring_1.format)(rawSql, placeholder);
            const resultUpdatePost = await pool.query(sqlFormat);
            return refreshtoken;
        }
        catch (err) {
            console.error('Error registering user:', err);
            throw new Error('Failed to register user');
        }
    }
    async findUserByRefreshToken(refreshtoken) {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = 'SELECT * FROM users WHERE refreshToken = ?';
            const placeholder = [refreshtoken];
            const sqlFormat = (0, sqlstring_1.format)(rawSql, placeholder);
            const resultPoolQuery = await pool.query(sqlFormat);
            if (resultPoolQuery[0].length > 0) {
                const [resultGetPostById] = resultPoolQuery[0].flat();
                return resultGetPostById;
            }
            else {
                console.error('user not found');
            }
        }
        catch (err) {
            console.error('Error registering user:', err);
            throw new Error('Failed to register user');
        }
    }
    async registerUser(note) {
        try {
            console.log("hit--create");
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = 'INSERT INTO users (email, password, refreshToken, role) VALUES (?, ?, ?, ?)';
            const placeholder = [note.email, note.password, 'none', 'user'];
            const sqlFormat = (0, sqlstring_1.format)(rawSql, placeholder);
            const resultCreatePost = await pool.query(sqlFormat);
            return { id: resultCreatePost[0].insertId, ...note };
        }
        catch (err) {
            console.error('Error registering user:', err);
            throw new Error('Failed to register user');
        }
    }
    async getUserByPhoneOrCreate(phone) {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = user_query_1.USER_QUERY.SELECT_USER_BY_PHONE;
            const results = await pool.query(rawSql);
            if (results) {
                return results;
            }
            else {
                return 'not user found';
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map