"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const db_helpers_1 = require("./db-helpers");
const classes_1 = require("../../../config/classes");
const db_helpers_2 = require("../auth/db-helpers");
const createTransaction = async (req, res, next) => {
    var _a, _b, _c, _d, _e, _f;
    try {
        const userId = req.user.id;
        if (!userId)
            throw new classes_1.BadRequestError({ code: 401, message: "Unauthorized" });
        const user = await (0, db_helpers_2.getUser)(userId);
        if (!user)
            throw new classes_1.BadRequestError({ code: 401, message: "Unauthorized" });
        const newTransaction = await (0, db_helpers_1.addTransaction)({
            userId: user.id,
            type: (_a = req.body) === null || _a === void 0 ? void 0 : _a.type,
            amount: (_b = req.body) === null || _b === void 0 ? void 0 : _b.amount,
            categoryId: (_c = req.body) === null || _c === void 0 ? void 0 : _c.categoryId,
            childCategoryId: (_d = req.body) === null || _d === void 0 ? void 0 : _d.childCategoryId,
            comment: (_e = req.body) === null || _e === void 0 ? void 0 : _e.comment,
            createdAt: (_f = req.body) === null || _f === void 0 ? void 0 : _f.createdAt,
        });
        newTransaction.save();
        user.addTransaction(newTransaction.id);
        user.updateBalance(`${newTransaction.type}${newTransaction.amount}`);
        user.save();
        res
            .status(200)
            .json({ message: "Transaction created", transaction: newTransaction });
    }
    catch (error) {
        next(error);
    }
};
exports.createTransaction = createTransaction;
