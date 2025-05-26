"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = void 0;
const db_helpers_1 = require("./db-helpers");
const fetchUser = async (req, res, next) => {
    try {
        const user = await (0, db_helpers_1.getUser)(req.user.id);
        res.status(200).json({
            message: "Action succesfull",
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
exports.fetchUser = fetchUser;
