"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appEnvValidate = void 0;
const envalid_1 = require("envalid");
const appEnvValidate = () => {
    (0, envalid_1.cleanEnv)(process.env, {
        APP_PORT: (0, envalid_1.port)(),
        MYSQL_HOST: (0, envalid_1.str)(),
        MYSQL_DATABASE: (0, envalid_1.str)(),
        MYSQL_USER: (0, envalid_1.str)(),
        MYSQL_PASSWORD: (0, envalid_1.str)(),
    });
};
exports.appEnvValidate = appEnvValidate;
//# sourceMappingURL=app.config.js.map