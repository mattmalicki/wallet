"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTransaction = void 0;
const classes_1 = require("../../../config/classes");
const db_helpers_1 = require("./db-helpers");
const db_helpers_2 = require("../auth/db-helpers");
const editTransaction = async (req, res, next) => {
    var _a, _b, _c, _d, _e, _f;
    try {
        const userId = req.user.id;
        if (!userId)
            throw new classes_1.BadRequestError({ code: 401, message: "Unauthorized" });
        const user = await (0, db_helpers_2.getUser)(userId);
        if (!user)
            throw new classes_1.BadRequestError({ code: 401, message: "Unauthorized" });
        const { amounts, transaction } = await (0, db_helpers_1.updateTransaction)({
            userId,
            id: req.params.id,
            type: (_a = req.body) === null || _a === void 0 ? void 0 : _a.type,
            amount: (_b = req.body) === null || _b === void 0 ? void 0 : _b.amount,
            categoryId: (_c = req.body) === null || _c === void 0 ? void 0 : _c.categoryId,
            childCategoryId: (_d = req.body) === null || _d === void 0 ? void 0 : _d.childCategoryId,
            comment: (_e = req.body) === null || _e === void 0 ? void 0 : _e.comment,
            createdAt: new Date((_f = req.body) === null || _f === void 0 ? void 0 : _f.createdAt),
        });
        console.log(amounts);
        user.updateBalance(amounts.oldAmount);
        user.updateBalance(amounts.newAmount);
        user.save();
        res.status(200).json({ message: "Transaction updated.", transaction });
    }
    catch (error) {
        next(error);
    }
};
exports.editTransaction = editTransaction;
