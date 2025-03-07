import { authMiddleware } from "../middlewares/auth";
import { createTransaction } from "../controllers/transactions/add-transaction";
import { fetchTransactions } from "../controllers/transactions/get-transactions";
import { editTransaction } from "../controllers/transactions/update-transaction";
import { removeTransaction } from "../controllers/transactions/delete-transaction";
import { Router } from "express";

const transactionRouter = Router();

transactionRouter.get("/", authMiddleware, fetchTransactions);
transactionRouter.put("/", authMiddleware, createTransaction);
transactionRouter.patch("/update", authMiddleware, editTransaction);
transactionRouter.delete("/delete", authMiddleware, removeTransaction);

export { transactionRouter };
