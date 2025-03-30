import { BadRequestError } from "../../../config/classes";
import { Category } from "../../../models/category";

async function fetchCategories() {
  const categories = await Category.find({});
  if (!categories) {
    throw new BadRequestError({
      message: "Unable to fetch categories",
    });
  }
  return categories;
}

async function fetchOnlyExpensesCategories() {
  const categories = await Category.find({ type: "-" });
  if (!categories) {
    throw new BadRequestError({
      message: "Unable to fetch categories",
    });
  }
  return categories;
}

async function fetchOnlyIncomeCategories() {
  const categories = await Category.find({ type: "+" });
  if (!categories) {
    throw new BadRequestError({
      message: "Unable to fetch categories",
    });
  }
  return categories;
}

export {
  fetchCategories,
  fetchOnlyExpensesCategories,
  fetchOnlyIncomeCategories,
};
