"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_1 = require("./secrets");
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_1 = require("../models/user");
const mongoose_1 = require("mongoose");
const passport_1 = __importDefault(require("passport"));
const classes_1 = require("./classes");
passport_1.default.use(new passport_jwt_1.default.Strategy({
    secretOrKey: secrets_1.jwtSecretKey,
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
}, async (_req, payload, done) => {
    try {
        const user = await user_1.User.findOne({
            _id: new mongoose_1.Types.ObjectId(payload.id),
            verified: true,
        });
        if (user) {
            return done(null, user);
        }
        return done(new classes_1.BadRequestError({ message: "Token is invalid" }), null);
    }
    catch (error) {
        done(error, null);
    }
}));
