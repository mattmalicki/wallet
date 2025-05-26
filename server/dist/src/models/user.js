"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    verified: {
        type: Boolean,
        default: false,
        select: false,
    },
    transactions: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "transaction",
        },
    ],
});
userSchema.methods.setPassword = function (password) {
    this.password = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync(10));
};
userSchema.methods.validatePassword = function (password) {
    return bcryptjs_1.default.compareSync(password, this.password);
};
userSchema.methods.isVerified = function () {
    return this.verified;
};
userSchema.methods.updateBalance = function (value) {
    this.balance = this.balance + Number(value);
};
userSchema.methods.getBalance = async function () {
    try {
        const user = await this.populate("transactions");
        const balance = user.transactions.reduce((preV, curV) => preV + Number(`${curV.type}${curV.amount}`), 0);
        user.balance = balance;
        return balance;
    }
    catch (error) {
        return error;
    }
};
userSchema.methods.addTransaction = function (transactionId) {
    this.transactions.push({ _id: transactionId });
};
userSchema.methods.removeTransaction = function (transactionId) {
    this.transactions.pull({ _id: transactionId });
};
const User = (0, mongoose_1.model)("user", userSchema);
exports.User = User;
