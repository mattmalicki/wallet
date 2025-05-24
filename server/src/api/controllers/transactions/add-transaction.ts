import { addTransaction } from "./db-helpers";
import { BadRequestError } from "../../../config/classes";
import { RequestHandler } from "express";
import { AuthReq } from "../../../config/interfaces";
import { getUser } from "../auth/db-helpers";

const createTransaction: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthReq).user.id;
    if (!userId)
      throw new BadRequestError({ code: 401, message: "Unauthorized" });
    const user = await getUser(userId);
    if (!user)
      throw new BadRequestError({ code: 401, message: "Unauthorized" });
    const newTransaction = await addTransaction({
      userId: user.id,
      type: req.body?.type,
      amount: req.body?.amount,
      categoryId: req.body?.categoryId,
      childCategoryId: req.body?.childCategoryId,
      comment: req.body?.comment,
      createdAt: req.body?.createdAt,
    });
    newTransaction.save();
    user.addTransaction(newTransaction.id);
    user.updateBalance(`${newTransaction.type}${newTransaction.amount}`);
    user.save();
    res
      .status(200)
      .json({ message: "Transaction created", transaction: newTransaction });
  } catch (error) {
    next(error);
  }
};

export { createTransaction };
