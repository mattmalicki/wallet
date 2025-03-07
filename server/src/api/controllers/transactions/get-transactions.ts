import { RequestHandler } from "express";
import { getTransactions } from "./db-helpers";
import { AuthReq } from "../../../config/interfaces";
import { BadRequestError } from "../../../config/classes";

const fetchTransactions: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthReq).user.id;
    if (!userId)
      throw new BadRequestError({ code: 401, message: "Unauthorized" });
    const transactions = await getTransactions(userId);
    res.status(202).json({ message: "Transactions fetched", transactions });
  } catch (error) {
    next(error);
  }
};

export { fetchTransactions };
