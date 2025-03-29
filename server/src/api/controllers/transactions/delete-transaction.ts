import { RequestHandler } from "express";
import { AuthReq } from "../../../config/interfaces";
import { deleteTransaction } from "./db-helpers";
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
    await deleteTransaction(userId, req.body.id);
    user.removeTransaction(req.body.id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    next(error);
  }
};

export { removeTransaction };
