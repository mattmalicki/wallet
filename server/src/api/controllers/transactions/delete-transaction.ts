import { RequestHandler } from "express";
import { AuthReq } from "../../../config/interfaces";
import { deleteTransaction } from "./db-helpers";

const removeTransaction: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthReq).user.id;
    await deleteTransaction(userId, req.body.id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    next(error);
  }
};

export { removeTransaction };
