import { RequestHandler } from "express";
import { AuthReq } from "../../../config/interfaces";
import { deleteTransaction, getOneTransaction } from "./db-helpers";
import { BadRequestError } from "../../../config/classes";
import { getUser } from "../auth/db-helpers";

const removeTransaction: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthReq).user.id;
    if (!userId)
      throw new BadRequestError({ code: 401, message: "Unauthorized" });
    const user = await getUser(userId);
    if (!user)
      throw new BadRequestError({ code: 401, message: "Unauthorized" });
    const transaction = await getOneTransaction(userId, req.params.id);
    if (!transaction)
      throw new BadRequestError({
        code: 401,
        message: "Unable to find transaction",
      });
    if (transaction.type === "+") {
      user.updateBalance(`-${transaction.amount}`);
    } else {
      user.updateBalance(`+${transaction.amount}`);
    }
    await deleteTransaction(userId, req.params.id);
    user.removeTransaction(req.params.id);
    res.status(200).json({ message: "Transaction deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export { removeTransaction };
