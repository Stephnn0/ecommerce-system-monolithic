"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRoute = void 0;
const express_1 = require("express");
const address_controller_1 = require("./address.controller");
class AddressRoute {
    constructor() {
        this.path = "/v1/address";
        this.router = (0, express_1.Router)();
        this.controller = new address_controller_1.AddressController();
        this.initRoute();
    }
    initRoute() {
        this.router.post(this.path + '/create', this.controller.createAddress);
    }
}
exports.AddressRoute = AddressRoute;
//# sourceMappingURL=address.router.js.map