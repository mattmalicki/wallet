import { addTransaction } from "./db-helpers";
import { BadRequestError } from "../../../config/classes";
import { RequestHandler } from "express";
import { AuthReq } from "../../../config/interfaces";
import { Types } from "mongoose";

const createTransaction: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthReq).user.id;
    if (!userId)
      throw new BadRequestError({ code: 401, message: "Unauthorized" });
    const newTransaction = await addTransaction({
      userId: new Types.ObjectId(userId),
      to: req.body?.to,
      value: req.body?.value,
      currency: req.body?.currency,
      category: req.body?.category,
      status: req.body?.status,
      createdAt: req.body?.createdAt,
    });
    res
      .status(200)
      .json({ message: "Transaction created", transaction: newTransaction });
  } catch (error) {
    next(error);
  }
};

export { createTransaction };
