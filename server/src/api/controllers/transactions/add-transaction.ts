import {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "./db-helpers";
import { BadRequestError } from "../../../config/classes";
import { RequestHandler } from "express";
import { AuthReq } from "../../../config/interfaces";
import { Types } from "mongoose";

const createTransaction: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthReq).user.id;
    if (!userId)
      throw new BadRequestError({ code: 401, message: "Unauthorized" });
    const newTransaction = await addTransaction({
      userId: new Types.ObjectId(userId),
      to: req.body?.to,
      value: req.body?.value,
      currency: req.body?.currency,
      status: req.body?.status,
      createdAt: req.body?.createdAt,
    });
    res
      .status(200)
      .json({ message: "Transaction created", transaction: newTransaction });
  } catch (error) {
    throw Error((error as Error).message);
  }
};

const fetchTransactions: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthReq).user.id;
    if (!userId)
      throw new BadRequestError({ code: 401, message: "Unauthorized" });
    const transactions = await getTransactions(userId);
    res.status(202).json({ message: "Transactions fetched", transactions });
  } catch (error) {
    throw Error((error as Error).message);
  }
};

const editTransaction: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthReq).user.id;
    if (!userId)
      throw new BadRequestError({ code: 401, message: "Unauthorized" });
    const transaction = await updateTransaction(
      userId,
      req.body.id,
      req.body?.to,
      req.body?.value,
      req.body?.currenct,
      req.body?.status,
      req.body?.createdAt
    );
    res.status(200).json({ message: "Transaction updated.", transaction });
  } catch (error) {
    throw Error((error as Error).message);
  }
};

const removeTransaction: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthReq).user.id;
    await deleteTransaction(userId, req.body.id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    throw Error((error as Error).message);
  }
};

export {
  createTransaction,
  fetchTransactions,
  editTransaction,
  removeTransaction,
};
