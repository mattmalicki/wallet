"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
var TransactionType;
(function (TransactionType) {
    TransactionType["income"] = "+";
    TransactionType["expense"] = "-";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
const transactionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "categories",
    },
    childCategoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    comment: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
const Transaction = (0, mongoose_1.model)("transaction", transactionSchema);
exports.Transaction = Transaction;
