import { RequestHandler } from "express";
import { fetchCategories } from "./db-helpers";

const getCategories: RequestHandler = async (_req, res, next) => {
  try {
    console.log("lkj");
    const categories = await fetchCategories();
    res.status(202).json({
      message: "Categories fetched successfuly.",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export { getCategories };
