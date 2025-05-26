"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsWithQuery = exports.deleteTransaction = exports.updateTransaction = exports.getOneTransaction = exports.getTransactions = exports.addTransaction = void 0;
const mongoose_1 = require("mongoose");
const transaction_1 = require("../../../models/transaction");
const classes_1 = require("../../../config/classes");
async function addTransaction(transaction) {
    const newTransaction = new transaction_1.Transaction(transaction);
    return newTransaction;
}
exports.addTransaction = addTransaction;
async function getTransactions(userId) {
    const transactions = await transaction_1.Transaction.find({
        userId: new mongoose_1.Types.ObjectId(userId),
    }).sort({ createdAt: "desc" });
    return transactions;
}
exports.getTransactions = getTransactions;
async function getTransactionsWithQuery(userId, month, year) {
    function lastDay(d) {
        return new Date(d.getFullYear(), d.getMonth() + 1, 0);
    }
    const date = new Date(`${year}-${month}`);
    const transactions = await transaction_1.Transaction.find({
        userId: new mongoose_1.Types.ObjectId(userId),
        createdAt: { $gte: date, $lte: lastDay(date) },
    });
    return transactions;
}
exports.getTransactionsWithQuery = getTransactionsWithQuery;
async function getOneTransaction(userId, id) {
    const transaction = await transaction_1.Transaction.findOne({
        _id: new mongoose_1.Types.ObjectId(id),
        userId: new mongoose_1.Types.ObjectId(userId),
    });
    return transaction;
}
exports.getOneTransaction = getOneTransaction;
async function updateTransaction(reqTransaction) {
    const transaction = await transaction_1.Transaction.findOne({
        _id: new mongoose_1.Types.ObjectId(reqTransaction.id),
        userId: new mongoose_1.Types.ObjectId(reqTransaction.userId),
    });
    let oldAmount = "0";
    let newAmount = "0";
    if (!transaction) {
        throw new classes_1.BadRequestError({ message: "Unauthorized." });
    }
    console.log(reqTransaction.type);
    if (reqTransaction.type || reqTransaction.amount) {
        oldAmount = `${transaction.type === "+" ? "-" : "+"}${transaction.amount}`;
        newAmount = `${reqTransaction.type}${reqTransaction.amount}`;
    }
    if (reqTransaction.type) {
        if (reqTransaction.type.toLowerCase() === "-")
            transaction.type = transaction_1.TransactionType.expense;
        if (reqTransaction.type.toLowerCase() === "+")
            transaction.type = transaction_1.TransactionType.income;
    }
    if (reqTransaction.amount) {
        transaction.amount = reqTransaction.amount;
    }
    if (reqTransaction.categoryId) {
        transaction.categoryId = new mongoose_1.Types.ObjectId(reqTransaction.categoryId);
    }
    if (reqTransaction.childCategoryId) {
        transaction.childCategoryId = new mongoose_1.Types.ObjectId(reqTransaction.childCategoryId);
    }
    if (reqTransaction.comment) {
        transaction.comment = reqTransaction.comment;
    }
    if (reqTransaction.createdAt) {
        transaction.createdAt = reqTransaction.createdAt;
    }
    transaction.save();
    return { amounts: { oldAmount, newAmount }, transaction };
}
exports.updateTransaction = updateTransaction;
async function deleteTransaction(userId, id) {
    await transaction_1.Transaction.findOneAndDelete({
        _id: new mongoose_1.Types.ObjectId(id),
        userId: new mongoose_1.Types.ObjectId(userId),
    });
}
exports.deleteTransaction = deleteTransaction;
