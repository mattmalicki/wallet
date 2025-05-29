"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const passport_1 = __importDefault(require("passport"));
const classes_1 = require("../../config/classes");
const authMiddleware = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (error, user) => {
        if (error || !user) {
            throw new classes_1.BadRequestError({ code: 498, message: "Token is invalid" });
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.authMiddleware = authMiddleware;
