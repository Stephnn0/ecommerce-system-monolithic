"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrettyLogger_1 = __importDefault(require("../logger/PrettyLogger"));
const ErrorHandler_1 = __importDefault(require("./ErrorHandler"));
class ErrorMiddleware {
    static globalErrorHandler(err, req, res, next) {
        const { status, name, code, message, isOperatinal } = ErrorHandler_1.default.handle(err);
        PrettyLogger_1.default.error(err, 'Error Middleware: ');
        res.status(status).json({ success: false, name, code, message, isOperatinal, status });
    }
}
exports.default = ErrorMiddleware;
//# sourceMappingURL=ErrorMiddleware.js.map