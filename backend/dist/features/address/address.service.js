"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const mysql2_1 = require("mysql2");
const mysql_config_1 = require("../../config/mysql.config");
const uuid_1 = require("uuid");
class AddressService {
    async createAddress(address) {
        try {
            console.log("hit--create");
            const addressId = (0, uuid_1.v4)();
            const pool = await (0, mysql_config_1.MySqlPool)();
            const rawSql = 'INSERT INTO address (id, firstName, lastName, company, phone, address, city, zip, country, customerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const placeholder = [addressId, address.firstName, address.lastName, address.company, address.phone, address.address, address.city, address.zip, address.country, address.customerId];
            const sqlFormat = (0, mysql2_1.format)(rawSql, placeholder);
            const resultCreatePost = await pool.query(sqlFormat);
            return { id: addressId, ...address };
        }
        catch (err) {
            console.log(err, 'err');
        }
    }
    getAddressByCustomer() {
        throw new Error("Method not implemented.");
    }
}
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map