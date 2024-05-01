"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const BaseError_1 = __importDefault(require("../BaseError"));
class Http400Error extends BaseError_1.default {
    constructor(code = 'BAD_REQUEST', message = 'Provided request format is invalid.') {
        super('BadRequest', http_status_1.default.BAD_REQUEST, true, code, message);
        this.code = code;
        this.message = message;
    }
}
exports.default = Http400Error;
//# sourceMappingURL=h400Error.js.map