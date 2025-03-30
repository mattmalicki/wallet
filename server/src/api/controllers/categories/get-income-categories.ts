import { RequestHandler } from "express";
import { fetchOnlyIncomeCategories } from "./db-helpers";

const getIncomeCategories: RequestHandler = async (_req, res, next) => {
  try {
    const categories = await fetchOnlyIncomeCategories();
    res.status(202).json({
      message: "Categories fetched successfuly.",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export { getIncomeCategories };
