"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServeError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const custom_error_1 = require("./custom/custom.error");
class InternalServeError extends custom_error_1.CustomError {
    constructor(errorRawMessage) {
        super({
            errorCode: Number(http_status_1.default["INTERNAL_SERVER_ERROR"]),
            errorName: String(http_status_1.default[`${http_status_1.default.INTERNAL_SERVER_ERROR}_NAME`]),
            errorMessage: String(http_status_1.default[`${http_status_1.default.INTERNAL_SERVER_ERROR}_MESSAGE`]),
            errorRawMessage: errorRawMessage
        });
    }
}
exports.InternalServeError = InternalServeError;
//# sourceMappingURL=server.error.js.map