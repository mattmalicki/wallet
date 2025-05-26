"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const classes_1 = require("../../../config/classes");
const db_helpers_1 = require("./db-helpers");
const token_1 = require("../../../models/token");
const token_helper_1 = require("../../helpers/token-helper");
const createUser = async (req, res, next) => {
    try {
        const createdUser = await (0, db_helpers_1.registerUser)(req.body);
        if (!createdUser) {
            throw new classes_1.BadRequestError({ code: 400, message: "Database error" });
        }
        const accessToken = (0, token_helper_1.signAccessToken)(createdUser.id);
        const refreshToken = (0, token_helper_1.signRefreshToken)(createdUser.id);
        const token = new token_1.Token({
            userId: createdUser.id,
            refreshToken: refreshToken,
            status: true,
            createdAt: Date.now(),
            expiresIn: Date.now() + 100 * 60 * 60 * 24 * 30,
        });
        token.save();
        res.json({
            message: "User created.",
            accessToken,
            refreshToken,
            user: {
                email: createdUser.email,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
                balance: createdUser.balance,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
