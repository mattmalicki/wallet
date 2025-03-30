import { authMiddleware } from "../middlewares/auth";
import { createTransaction } from "../controllers/transactions/add-transaction";
import { fetchTransactions } from "../controllers/transactions/get-transactions";
import { editTransaction } from "../controllers/transactions/edit-transaction";
import { removeTransaction } from "../controllers/transactions/delete-transaction";
import { Router } from "express";

const transactionRouter = Router();

transactionRouter.get("/", authMiddleware, fetchTransactions);
transactionRouter.post("/", authMiddleware, createTransaction);
transactionRouter.patch("/update/:id", authMiddleware, editTransaction);
transactionRouter.delete("/delete/:id", authMiddleware, removeTransaction);

export { transactionRouter };
