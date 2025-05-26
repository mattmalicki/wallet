"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOnlyIncomeCategories = exports.fetchOnlyExpensesCategories = exports.fetchCategories = void 0;
const classes_1 = require("../../../config/classes");
const category_1 = require("../../../models/category");
async function fetchCategories() {
    const categories = await category_1.Category.find({});
    if (!categories) {
        throw new classes_1.BadRequestError({
            message: "Unable to fetch categories",
        });
    }
    return categories;
}
exports.fetchCategories = fetchCategories;
async function fetchOnlyExpensesCategories() {
    const categories = await category_1.Category.find({ type: "-" });
    if (!categories) {
        throw new classes_1.BadRequestError({
            message: "Unable to fetch categories",
        });
    }
    return categories;
}
exports.fetchOnlyExpensesCategories = fetchOnlyExpensesCategories;
async function fetchOnlyIncomeCategories() {
    const categories = await category_1.Category.find({ type: "+" });
    if (!categories) {
        throw new classes_1.BadRequestError({
            message: "Unable to fetch categories",
        });
    }
    return categories;
}
exports.fetchOnlyIncomeCategories = fetchOnlyIncomeCategories;
