"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlPool = void 0;
const promise_1 = require("mysql2/promise");
const MySqlPool = async () => {
    const pool = await (0, promise_1.createPool)({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });
    return pool;
};
exports.MySqlPool = MySqlPool;
//# sourceMappingURL=mysql.config.js.map