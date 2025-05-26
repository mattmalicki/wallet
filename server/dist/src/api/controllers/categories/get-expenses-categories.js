"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpensesCategories = void 0;
const db_helpers_1 = require("./db-helpers");
const getExpensesCategories = async (_req, res, next) => {
    try {
        const categories = await (0, db_helpers_1.fetchOnlyExpensesCategories)();
        res.status(202).json({
            message: "Categories fetched successfuly.",
            categories,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getExpensesCategories = getExpensesCategories;
