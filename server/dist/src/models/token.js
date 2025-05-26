"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    refreshToken: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
});
const Token = (0, mongoose_1.model)("token", tokenSchema);
exports.Token = Token;
