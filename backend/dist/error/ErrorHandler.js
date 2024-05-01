"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("./BaseError"));
const h500Error_1 = __importDefault(require("./errors/h500Error"));
class ErrorHandler {
    static isTrustedError(err) {
        if (err instanceof BaseError_1.default)
            return err.isOperatinal;
        return false;
    }
    static handle(err) {
        if (this.isTrustedError(err) && err instanceof BaseError_1.default)
            return err;
        console.log('error handler working');
        return new h500Error_1.default();
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map