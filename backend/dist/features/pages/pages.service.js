"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageService = void 0;
const sqlstring_1 = require("sqlstring");
const mysql_config_1 = require("../../config/mysql.config");
class PageService {
    async getSinglePage(pageId) {
        try {
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = "SELECT * FROM pages WHERE id=?";
            const placeholder = [pageId];
            const sqlFormat = (0, sqlstring_1.format)(rawSql, placeholder);
            const resultPoolQuery = await pool.query(sqlFormat);
            if (resultPoolQuery[0].length > 0) {
                const [resultGetPostById] = resultPoolQuery[0].flat();
                return resultGetPostById;
            }
            else {
                throw new Error("Error fetching pages by category");
            }
        }
        catch (err) {
            console.error("Error fetching pages by id:", err);
            throw new Error("Error fetching pages by id");
        }
    }
}
exports.PageService = PageService;
//# sourceMappingURL=pages.service.js.map