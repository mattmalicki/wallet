"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const classes_1 = require("../../../config/classes");
const token_helper_1 = require("../../helpers/token-helper");
const token_1 = require("../../../models/token");
const user_1 = require("../../../models/user");
const refreshToken = async (req, res, next) => {
    try {
        const reqToken = req.body.refreshToken;
        if (!reqToken)
            throw new classes_1.BadRequestError({ message: "Missing token" });
        const payload = (0, token_helper_1.checkRefreshToken)(reqToken);
        if (payload.message)
            throw new classes_1.BadRequestError({ message: "Token is invalid" });
        const userId = payload.id;
        const user = await user_1.User.findById(userId);
        const userToken = await token_1.Token.findOne({
            userId: userId,
        });
        if (!userToken || userToken.refreshToken !== reqToken)
            throw new classes_1.BadRequestError({ message: "Token is invalid" });
        if (userToken.expiresIn <= Date.now() || !userToken.status)
            throw new classes_1.BadRequestError({ message: "Token is expired" });
        if (!user)
            throw new classes_1.BadRequestError({ message: "User is not valid" });
        const accessToken = (0, token_helper_1.signAccessToken)(userId);
        res.status(200).json({
            message: "New access token signed",
            accessToken,
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
exports.refreshToken = refreshToken;
