"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(name, status, isOperatinal, code, message) {
        super(message);
        this.name = name;
        this.status = status;
        this.isOperatinal = isOperatinal;
        this.code = code;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.status = status;
        this.isOperatinal = isOperatinal;
        this.code = code;
        this.message = message;
        Error.captureStackTrace(this);
    }
}
exports.default = BaseError;
//# sourceMappingURL=BaseError.js.map