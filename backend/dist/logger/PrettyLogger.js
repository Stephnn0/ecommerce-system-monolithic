"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("config"));
class PrettyLog {
    constructor() {
        this.env = config_1.default.get('server.env');
        this.logger = (0, pino_1.default)({
            transport: {
                target: 'pino-pretty',
                options: {
                    levelFirst: true,
                    translateTime: true,
                    colorize: true,
                    env: 'development',
                },
            },
        });
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new PrettyLog();
        return this.instance;
    }
    showLogOnlyOnDevelopment(level, log, msg) {
        if (this.env === 'development')
            this.logger[level](log, msg);
    }
    info(log, msg) {
        this.showLogOnlyOnDevelopment('info', log, msg);
    }
    error(log, msg) {
        this.showLogOnlyOnDevelopment('error', log, msg);
    }
    warn(log, msg) {
        this.showLogOnlyOnDevelopment('warn', log, msg);
    }
    debug(log, msg) {
        this.showLogOnlyOnDevelopment('debug', log, msg);
    }
}
exports.default = PrettyLog.getInstance();
//# sourceMappingURL=PrettyLogger.js.map