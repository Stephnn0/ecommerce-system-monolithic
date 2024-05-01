"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckController = void 0;
const events_1 = __importDefault(require("events"));
class MyEmitter extends events_1.default {
}
const myEmitter = new MyEmitter();
class HealthCheckController {
    constructor() {
        this.getHealth = (request, response) => {
            console.log('hit');
            throw new Error("test error");
        };
    }
}
exports.HealthCheckController = HealthCheckController;
//# sourceMappingURL=health.controller.js.map