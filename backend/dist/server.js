"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_database_1 = require("./config/mysql.database");
const app_route_1 = require("./app.route");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app_config_1 = require("./app.config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const PrettyLogger_1 = __importDefault(require("./logger/PrettyLogger"));
const config_1 = __importDefault(require("config"));
const ErrorMiddleware_1 = __importDefault(require("./error/ErrorMiddleware"));
class Server {
    constructor() {
        this.serverPort = Number(process.env.APP_PORT || 3000);
        this.env = config_1.default.get('server.env');
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.httpServer, {
            pingTimeout: 60000,
            cors: {
                origin: ['*']
            }
        });
        this.initEnvironment();
        this.initMiddlewares();
        this.initRoutes();
        this.initSockets();
        this.initErrorHandling();
        this.unCaughtErrorHandler();
    }
    initEnvironment() {
        (0, app_config_1.appEnvValidate)();
    }
    initMiddlewares() {
        this.app.use((0, cors_1.default)({
            origin: "http://localhost:5173",
            methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
            credentials: true
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, express_rate_limit_1.default)({
            windowMs: 24 * 60 * 3,
            max: 5,
            message: 'To many request, send back request after 3 minutes'
        }));
    }
    initErrorHandling() {
        this.app.use(ErrorMiddleware_1.default.globalErrorHandler);
    }
    unCaughtErrorHandler() {
        process.on('uncaughtException', (err) => {
            console.log('----hit----');
            PrettyLogger_1.default.error(err, 'uncaught error handler');
            process.exit(1);
        });
    }
    initRoutes() {
        (0, app_route_1.appModuleRoute)(this.app);
        (0, app_route_1.appDefaultRoute)(this.app);
    }
    initSockets() {
        this.io.on('connection', (socket) => {
            console.log('A user connected');
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    }
    getServer() {
        return this.app;
    }
    serverListen() {
        return this.getServer().listen(Number(this.serverPort), async () => {
            new mysql_database_1.AppDatabase().openConnection();
            console.log(`App port : ${this.serverPort}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map