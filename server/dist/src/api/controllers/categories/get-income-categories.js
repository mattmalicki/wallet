"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncomeCategories = void 0;
const db_helpers_1 = require("./db-helpers");
const getIncomeCategories = async (_req, res, next) => {
    try {
        const categories = await (0, db_helpers_1.fetchOnlyIncomeCategories)();
        res.status(202).json({
            message: "Categories fetched successfuly.",
            categories,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getIncomeCategories = getIncomeCategories;
