import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { getCategories } from "../controllers/categories/get-categories";
import { getIncomeCategories } from "../controllers/categories/get-income-categories";
import { getExpensesCategories } from "../controllers/categories/get-expenses-categories";

const categoriesRouter = Router();

categoriesRouter.get("/", authMiddleware, getCategories);
categoriesRouter.get("/income", authMiddleware, getIncomeCategories);
categoriesRouter.get("/expenses", authMiddleware, getExpensesCategories);

export { categoriesRouter };
