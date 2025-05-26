"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    childCategories: [
        {
            id: mongoose_1.Types.ObjectId,
            title: String,
        },
    ],
});
const Category = (0, mongoose_1.model)("category", categorySchema, "categories");
exports.Category = Category;
