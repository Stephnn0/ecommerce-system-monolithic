"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const BaseError_1 = __importDefault(require("../BaseError"));
class Http500Error extends BaseError_1.default {
    constructor(code = 'INTERNAL_SERVER_ERROR', message = 'Something went wrong please try again later.') {
        super('InternalServerError', http_status_1.default.INTERNAL_SERVER_ERROR, true, code, message);
        this.code = code;
        this.message = message;
    }
}
exports.default = Http500Error;
//# sourceMappingURL=h500Error.js.map