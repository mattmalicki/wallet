import { RequestHandler } from "express";
import { deleteUser } from "./db-helpers";
import { AuthReq } from "../../../config/interfaces";
import { Token } from "../../../models/token";

const removeUser: RequestHandler = async (req, res, next) => {
  try {
    await deleteUser((req as AuthReq).user.id);
    await Token.findOneAndDelete({ userId: (req as AuthReq).user.id });
    res.status(200).json({ message: "Account has been deleted." });
  } catch (error) {
    next(error);
  }
};

export { removeUser };
