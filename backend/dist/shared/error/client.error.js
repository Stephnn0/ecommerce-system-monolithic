"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = exports.NotFound = void 0;
const http_status_1 = __importDefault(require("http-status"));
const custom_error_1 = require("./custom/custom.error");
class NotFound extends custom_error_1.CustomError {
    constructor(errorRawMessage) {
        super({
            errorCode: Number(http_status_1.default["NOT_FOUND"]),
            errorName: String(http_status_1.default[`${http_status_1.default.NOT_FOUND}_NAME`]),
            errorMessage: String(http_status_1.default[`${http_status_1.default.NOT_FOUND}_MESSAGE`]),
            errorRawMessage: errorRawMessage
        });
    }
}
exports.NotFound = NotFound;
class BadRequest extends custom_error_1.CustomError {
    constructor(errorRawMessage) {
        super({
            errorCode: Number(http_status_1.default["BAD_REQUEST"]),
            errorName: String(http_status_1.default[`${http_status_1.default.BAD_REQUEST}_NAME`]),
            errorMessage: String(http_status_1.default[`${http_status_1.default.BAD_REQUEST}_MESSAGE`]),
            errorRawMessage: errorRawMessage
        });
    }
}
exports.BadRequest = BadRequest;
//# sourceMappingURL=client.error.js.map