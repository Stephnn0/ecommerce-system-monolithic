"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessOk = exports.SuccessNonAuthInfo = exports.SuccessNoContent = exports.SuccessCreated = exports.SuccessAccepted = void 0;
const http_status_1 = __importDefault(require("http-status"));
const SuccessOk = (response, payload) => {
    const statusOk = {
        statusCode: Number(http_status_1.default["OK"]),
        statusName: String(http_status_1.default[`${http_status_1.default.OK}_NAME`]),
        ...(payload ? { payload } : {})
    };
    return response.status(statusOk.statusCode).json(statusOk);
};
exports.SuccessOk = SuccessOk;
const SuccessCreated = (response, payload) => {
    const statusCreated = {
        statusCode: Number(http_status_1.default["CREATED"]),
        statusName: String(http_status_1.default[`${http_status_1.default.OK}_CREATED`]),
        ...(payload ? { payload } : {})
    };
    return response.status(statusCreated.statusCode).json(statusCreated);
};
exports.SuccessCreated = SuccessCreated;
const SuccessAccepted = (response, payload) => {
    const statusAccepted = {
        statusCode: Number(http_status_1.default["ACCEPTED"]),
        statusName: String(http_status_1.default[`${http_status_1.default.OK}_ACCEPTED`]),
        ...(payload ? { payload } : {})
    };
    return response.status(statusAccepted.statusCode).json(statusAccepted);
};
exports.SuccessAccepted = SuccessAccepted;
const SuccessNonAuthInfo = (response, payload) => {
    const statusNonAuthInfo = {
        statusCode: Number(http_status_1.default["NON_AUTHORITATIVE_INFORMATION"]),
        statusName: String(http_status_1.default[`${http_status_1.default.OK}_NON_AUTHORITATIVE_INFORMATION`]),
        ...(payload ? { payload } : {})
    };
    return response.status(statusNonAuthInfo.statusCode).json(statusNonAuthInfo);
};
exports.SuccessNonAuthInfo = SuccessNonAuthInfo;
const SuccessNoContent = (response, payload) => {
    const statusNonAuthInfo = {
        statusCode: Number(http_status_1.default["NO_CONTENT"]),
        statusName: String(http_status_1.default[`${http_status_1.default.OK}_NO_CONTENT`]),
        ...(payload ? { payload } : {})
    };
    return response.status(statusNonAuthInfo.statusCode).json(statusNonAuthInfo);
};
exports.SuccessNoContent = SuccessNoContent;
//# sourceMappingURL=success.response.js.map