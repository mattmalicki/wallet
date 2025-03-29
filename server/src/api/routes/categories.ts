import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { getCategories } from "../controllers/categories/get-categories";

const categoriesRouter = Router();

categoriesRouter.get("/", authMiddleware, getCategories);

export { categoriesRouter };
