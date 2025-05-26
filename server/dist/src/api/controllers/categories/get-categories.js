"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const db_helpers_1 = require("./db-helpers");
const getCategories = async (_req, res, next) => {
    try {
        const categories = await (0, db_helpers_1.fetchCategories)();
        res.status(202).json({
            message: "Categories fetched successfuly.",
            categories,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCategories = getCategories;
