"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTransaction = void 0;
const db_helpers_1 = require("./db-helpers");
const classes_1 = require("../../../config/classes");
const db_helpers_2 = require("../auth/db-helpers");
const removeTransaction = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId)
            throw new classes_1.BadRequestError({ code: 401, message: "Unauthorized" });
        const user = await (0, db_helpers_2.getUser)(userId);
        if (!user)
            throw new classes_1.BadRequestError({ code: 401, message: "Unauthorized" });
        const transaction = await (0, db_helpers_1.getOneTransaction)(userId, req.params.id);
        if (!transaction)
            throw new classes_1.BadRequestError({
                code: 401,
                message: "Unable to find transaction",
            });
        if (transaction.type === "+") {
            user.updateBalance(`-${transaction.amount}`);
        }
        else {
            user.updateBalance(`+${transaction.amount}`);
        }
        await (0, db_helpers_1.deleteTransaction)(userId, req.params.id);
        user.removeTransaction(req.params.id);
        user.save();
        res.status(200).json({ message: "Transaction deleted", id: req.params.id });
    }
    catch (error) {
        next(error);
    }
};
exports.removeTransaction = removeTransaction;
