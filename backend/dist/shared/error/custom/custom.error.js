"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor({ errorCode, errorName, errorMessage, errorRawMessage }) {
        super(errorMessage);
        this.errorCode = errorCode;
        this.errorName = errorName;
        this.errorMessage = errorMessage;
        this.errorRawMessage = errorRawMessage;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom.error.js.map