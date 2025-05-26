"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTransactions = void 0;
const db_helpers_1 = require("./db-helpers");
const classes_1 = require("../../../config/classes");
const fetchTransactions = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId)
            throw new classes_1.BadRequestError({ code: 401, message: "Unauthorized" });
        const { month, year } = req.query;
        if (month && year) {
            const transactions = await (0, db_helpers_1.getTransactionsWithQuery)(userId, Number(month), Number(year));
            res.status(202).json({
                message: "Transactions fetched",
                transactions,
            });
        }
        else {
            const transactions = await (0, db_helpers_1.getTransactions)(userId);
            res.status(202).json({
                message: "Transactions fetched",
                transactions,
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.fetchTransactions = fetchTransactions;
