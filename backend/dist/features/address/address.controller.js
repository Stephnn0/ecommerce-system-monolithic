"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const address_service_1 = require("./address.service");
class AddressController {
    constructor() {
        this.createAddress = async (request, response) => {
            console.log("-----hit address create------");
            try {
                const { firstName, lastName, company, phone, address, city, zip, country, customerId } = request.body;
                console.log("-----req body create------", request.body);
                if (!firstName || !lastName) {
                    return response.status(400).json({ message: 'Email and password are required.' });
                }
                const addressData = { firstName, lastName, company, phone, address, city, zip, country, customerId };
                const results = await this.addressService.createAddress(addressData);
                response.status(201).json(results);
            }
            catch (err) {
                console.log(err);
                response.status(500).json({ message: 'Internal server error' });
            }
        };
        this.addressService = new address_service_1.AddressService();
    }
}
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map