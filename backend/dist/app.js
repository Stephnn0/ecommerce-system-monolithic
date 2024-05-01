"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const server_1 = __importDefault(require("./server"));
const serverInstance = new server_1.default();
exports.httpServer = serverInstance.getServer();
(async () => serverInstance.serverListen())();
//# sourceMappingURL=app.js.map