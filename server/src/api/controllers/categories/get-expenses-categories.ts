import { RequestHandler } from "express";
import { fetchOnlyExpensesCategories } from "./db-helpers";

const getExpensesCategories: RequestHandler = async (_req, res, next) => {
  try {
    const categories = await fetchOnlyExpensesCategories();
    res.status(202).json({
      message: "Categories fetched successfuly.",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export { getExpensesCategories };
