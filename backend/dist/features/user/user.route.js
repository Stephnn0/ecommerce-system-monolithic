"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
class UserRoute {
    constructor() {
        this.path = "/v1/auth";
        this.router = (0, express_1.Router)();
        this.controller = new user_controller_1.UserController();
        this.initRoute();
    }
    initRoute() {
        this.router.post(this.path + '/register', this.controller.register);
        this.router.post(this.path + '/login', this.controller.login);
        this.router.get(this.path + '/refresh', this.controller.refreshToken);
        this.router.get(this.path + '/logout', this.controller.logout);
    }
}
exports.UserRoute = UserRoute;
//# sourceMappingURL=user.route.js.map