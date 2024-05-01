"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const verifyJWT_1 = __importDefault(require("../../shared/middleware/verifyJWT"));
const fileUpload_1 = require("../../shared/middleware/fileUpload");
const ROLES_LIST = {
    "admin": 'admin',
    "user": 'user',
};
class ProductRoute {
    constructor() {
        this.path = "/v1/product";
        this.router = (0, express_1.Router)();
        this.controller = new product_controller_1.ProductController();
        this.initRoute();
    }
    initRoute() {
        this.router.post(this.path + '/create', fileUpload_1.fileUploadMiddleware, verifyJWT_1.default, this.controller.createProduct),
            this.router.get(this.path + '/getAll', this.controller.getAllProducts),
            this.router.get(this.path + '/getSingle/:id', this.controller.getSingleProduct),
            this.router.get(this.path + '/getCart', this.controller.getCartProducts),
            this.router.get(this.path + '/byCategory', this.controller.getProductsByCategory);
    }
}
exports.ProductRoute = ProductRoute;
//# sourceMappingURL=product.route.js.map