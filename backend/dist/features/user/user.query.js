"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_QUERY = void 0;
exports.USER_QUERY = {
    SELECT_USER_BY_PHONE: "SELECT * FROM users WHERE phone=?",
    CREATE_USER: "INSERT INTO users (name, lastname, phone) VALUES (?, ?, ?)",
    SELECT_USERS: "SELECT id, name, lastname, phone FROM users"
};
//# sourceMappingURL=user.query.js.map