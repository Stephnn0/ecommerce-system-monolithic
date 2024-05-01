"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader)
        return res.sendStatus(401);
    const tokenArray = Array.isArray(authHeader) ? authHeader : [authHeader];
    const token = tokenArray.find(header => header.startsWith('Bearer '));
    if (!token)
        return res.sendStatus(401);
    const tokenValue = token.split(' ')[1];
    jsonwebtoken_1.default.verify(tokenValue, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.status(403).json({ error: 'invalid token 403 error' });
        req.email = decoded.UserInfo.email;
        req.roles = decoded.UserInfo.roles;
        next();
    });
};
exports.default = verifyJWT;
//# sourceMappingURL=verifyJWT.js.map