"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = void 0;
const db_helpers_1 = require("./db-helpers");
const token_1 = require("../../../models/token");
const secrets_1 = require("../../../config/secrets");
const removeUser = async (req, res, next) => {
    try {
        await (0, db_helpers_1.deleteUser)(req.user.id);
        await token_1.Token.findOneAndDelete({ userId: req.user.id });
        res.clearCookie(secrets_1.refreshTokenCookieName);
        res.status(200).json({ message: "Account has been deleted." });
    }
    catch (error) {
        next(error);
    }
};
exports.removeUser = removeUser;
