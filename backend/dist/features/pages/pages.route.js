"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRoute = void 0;
const express_1 = require("express");
const pages_controller_1 = require("./pages.controller");
class PageRoute {
    constructor() {
        this.path = "/v1/page";
        this.router = (0, express_1.Router)();
        this.controller = new pages_controller_1.PageController();
        this.initRoute();
    }
    initRoute() {
        this.router.get(this.path + '/getSinglePage', this.controller.getSinglePage);
    }
}
exports.PageRoute = PageRoute;
//# sourceMappingURL=pages.route.js.map