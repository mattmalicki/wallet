import { authMiddleware } from "../middlewares/auth";
import {
  createTransaction,
  fetchTransactions,
  editTransaction,
  removeTransaction,
} from "../controllers/transactions/add-transaction";
import { Router } from "express";

const transactionRouter = Router();

transactionRouter.get("/", authMiddleware, fetchTransactions);
transactionRouter.put("/", authMiddleware, createTransaction);
transactionRouter.patch("/update", authMiddleware, editTransaction);
transactionRouter.delete("/delete", authMiddleware, removeTransaction);

export { transactionRouter };
