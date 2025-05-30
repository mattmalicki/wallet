"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRefreshToken = exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../../config/secrets");
function signAccessToken(userId) {
    const accessToken = jsonwebtoken_1.default.sign({ id: userId }, secrets_1.jwtSecretKey, {
        expiresIn: "1h",
    });
    return accessToken;
}
exports.signAccessToken = signAccessToken;
function signRefreshToken(userId) {
    const refreshToken = jsonwebtoken_1.default.sign({ id: userId }, secrets_1.jwtRefreshSecretKey, {
        expiresIn: "30d",
    });
    return refreshToken;
}
exports.signRefreshToken = signRefreshToken;
function signVerifyToken(email) {
    const verifyToken = jsonwebtoken_1.default.sign({ email }, secrets_1.jwtTokenSecretKey, {
        expiresIn: "15min",
    });
    return verifyToken;
}
function checkRefreshToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, secrets_1.jwtRefreshSecretKey);
    }
    catch (error) {
        return error;
    }
}
exports.checkRefreshToken = checkRefreshToken;
