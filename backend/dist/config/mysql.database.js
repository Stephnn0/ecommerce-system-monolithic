"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDatabase = void 0;
const server_error_1 = require("../shared/error/server.error");
const mysql_config_1 = require("./mysql.config");
const mysql_query_1 = require("./mysql.query");
class AppDatabase {
    constructor() {
        this.openConnection = async () => {
            try {
                const pool = await (0, mysql_config_1.MySqlPool)();
                const [threadConnected] = await pool.query(mysql_query_1.APP_QUERY.THREADS_CONNECTED);
                const thread = threadConnected.map((item) => item.Value);
                console.log(`MySql Open connections : ${thread[0]}`);
            }
            catch (error) {
                throw new server_error_1.InternalServeError(error);
            }
        };
        this.closeConnection = async () => {
            try {
                const pool = (await (0, mysql_config_1.MySqlPool)()).end;
                console.log(`MySql close connections : ${pool.length}`);
            }
            catch (error) {
                throw new server_error_1.InternalServeError(error);
            }
        };
    }
}
exports.AppDatabase = AppDatabase;
//# sourceMappingURL=mysql.database.js.map