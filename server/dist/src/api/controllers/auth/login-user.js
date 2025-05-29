"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinUser = void 0;
const classes_1 = require("../../../config/classes");
const db_helpers_1 = require("./db-helpers");
const token_helper_1 = require("../../helpers/token-helper");
const token_1 = require("../../../models/token");
const secrets_1 = require("../../../config/secrets");
const signinUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new classes_1.BadRequestError({
                code: 400,
                message: "Missing email or password",
            });
        }
        const user = await (0, db_helpers_1.loginUser)(email, password);
        const accessToken = (0, token_helper_1.signAccessToken)(user.id);
        const refreshToken = (0, token_helper_1.signRefreshToken)(user.id);
        await token_1.Token.findOneAndUpdate({
            userId: user.id,
        }, {
            $set: {
                refreshToken: refreshToken,
                status: true,
                createdAt: Date.now(),
                expiresIn: Date.now() + 100 * 60 * 60 * 24 * 30,
            },
        });
        await user.getBalance();
        user.save();
        res.cookie(secrets_1.refreshTokenCookieName, refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/auth/refresh",
        });
        res.status(200).json({
            message: "Login successfull",
            accessToken,
            refreshToken,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                balance: user.balance,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signinUser = signinUser;
