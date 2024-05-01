"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const success_response_1 = require("../../shared/response/success/success.response");
const user_service_1 = require("./user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const h500Error_1 = __importDefault(require("../../error/errors/h500Error"));
const h400Error_1 = __importDefault(require("../../error/errors/h400Error"));
class UserController {
    constructor() {
        this.logout = async (request, response) => {
            const cookies = request.cookies;
            if (!cookies?.jwt)
                return response.sendStatus(204);
            const refreshToken = cookies.jwt;
            const foundUser = await this.userService.findUserByRefreshToken(refreshToken);
            if (!foundUser) {
                response.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
                return response.sendStatus(204);
            }
            await this.userService.deleteRefreshToken(refreshToken);
            console.log('deleted token');
            response.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            return response.sendStatus(204);
        };
        this.refreshToken = async (request, response) => {
            console.log('hit refresh');
            const cookies = request.cookies;
            if (!cookies?.jwt)
                return response.sendStatus(401);
            const refreshToken = cookies.jwt;
            const foundUser = await this.userService.findUserByRefreshToken(refreshToken);
            jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err || foundUser.email !== decoded?.email)
                    return response.sendStatus(403);
                const role = foundUser.role;
                const accessToken = jsonwebtoken_1.default.sign({
                    "UserInfo": {
                        "email": decoded.email,
                        "role": role
                    }
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                response.json({ accessToken });
                console.log('response refresh', accessToken);
            });
        };
        this.adminLogin = async (request, response) => { };
        this.login = async (request, response) => {
            try {
                const { email, password } = request.body;
                const userData = { email, password };
                if (!email || !password) {
                    return response.status(400).json({ message: 'Email and password are required.' });
                }
                const foundUser = await this.userService.findUserByEmail(userData);
                const match = await bcrypt_1.default.compare(password, foundUser.password);
                if (match) {
                    const role = foundUser.role;
                    const id = foundUser.id;
                    const accessToken = jsonwebtoken_1.default.sign({
                        UserInfo: {
                            email: foundUser.email,
                            role: role,
                            id: id
                        },
                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50m' });
                    const refreshToken = jsonwebtoken_1.default.sign({
                        email: foundUser.email
                    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
                    await this.userService.refreshToken(refreshToken, foundUser.id);
                    response.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
                    response.json({ accessToken });
                    console.log("successful login", foundUser.email);
                    console.log("refresh token", refreshToken);
                    console.log("access token", accessToken);
                }
                else {
                    response.status(401).json({ message: "bcrypt passwords dont match" });
                }
            }
            catch (err) {
                console.log(err);
                response.status(500).json({ message: 'Internal server error' });
            }
        };
        this.register = async (request, response, next) => {
            try {
                const { email, password } = request.body;
                if (!email || !password) {
                    next(new h400Error_1.default());
                }
                const hashedPwd = await bcrypt_1.default.hash(password, 10);
                const userData = { email, password: hashedPwd };
                console.log('hit');
                const results = await this.userService.registerUser(userData);
                response.status(201).json(results);
            }
            catch (err) {
                console.log(err);
                next(new h500Error_1.default());
            }
        };
        this.getUserByPhone = async (request, response) => {
            request.body.phone;
            try {
                console.log('hit');
                const results = await this.userService.getUserByPhoneOrCreate(request.body.phone);
                (0, success_response_1.SuccessOk)(response, results);
            }
            catch (err) {
                console.log(err);
            }
        };
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map