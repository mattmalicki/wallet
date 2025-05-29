"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signoutUser = void 0;
const db_helpers_1 = require("./db-helpers");
const token_1 = require("../../../models/token");
const secrets_1 = require("../../../config/secrets");
const signoutUser = async (req, res, next) => {
    try {
        await (0, db_helpers_1.getUser)(req.user.id);
        await token_1.Token.findOneAndUpdate({ userId: req.user.id }, { $set: { status: false } });
        res.clearCookie(secrets_1.refreshTokenCookieName);
        res.json({ message: "Logged out without problems." });
    }
    catch (error) {
        next(error);
    }
};
exports.signoutUser = signoutUser;
