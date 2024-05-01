import { FieldPacket, ResultSetHeader, RowDataPacket, format } from "mysql2";
import { MySqlPool } from "../../config/mysql.config";
import { IAddress, IAddressCreate, IAddressService } from "./address.interface";
import { v4 as uuidv4 } from 'uuid';


type ResultSet = [RowDataPacket[] | RowDataPacket[][] | ResultSetHeader, FieldPacket[]];


class AddressService implements IAddressService {


    async createAddress(address: IAddressCreate): Promise<IAddress> {
        try {
            console.log("hit--create")
            const addressId = uuidv4()

            const pool = await MySqlPool();
            const rawSql = 'INSERT INTO address (id, firstName, lastName, company, phone, address, city, zip, country, customerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            const placeholder = [addressId, address.firstName, address.lastName, address.company, address.phone, address.address, address.city, address.zip, address.country, address.customerId];
            const sqlFormat: string = format(rawSql, placeholder);
            const resultCreatePost: ResultSet = await pool.query(sqlFormat);
            return { id: addressId, ...address };

        } catch(err){
            console.log(err, 'err')
        }
    }


    getAddressByCustomer() {
        throw new Error("Method not implemented.");
    }
}


export { AddressService }


