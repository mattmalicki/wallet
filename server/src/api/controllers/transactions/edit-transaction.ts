import { RequestHandler } from "express";
import { AuthReq } from "../../../config/interfaces";
import { BadRequestError } from "../../../config/classes";
import { updateTransaction } from "./db-helpers";

const editTransaction: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthReq).user.id;
    if (!userId)
      throw new BadRequestError({ code: 401, message: "Unauthorized" });
    const transaction = await updateTransaction({
      userId,
      id: req.params.id,
      type: req.body?.type,
      amount: req.body?.amount,
      categoryId: req.body?.categoryId,
      childCategoryId: req.body?.childCategoryId,
      comment: req.body?.comment,
      createdAt: new Date(req.body?.createdAt),
    });
    res.status(200).json({ message: "Transaction updated.", transaction });
  } catch (error) {
    next(error);
  }
};

export { editTransaction };
