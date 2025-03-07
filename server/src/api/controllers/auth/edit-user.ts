import { RequestHandler } from "express";
import { AuthReq } from "../../../config/interfaces";
import { updateUser } from "./db-helpers";

const editUser: RequestHandler = async (req, res, next) => {
  try {
    const id = (req as AuthReq).user.id;
    const user = await updateUser(
      id,
      req.body?.email,
      req.body?.password,
      req.body?.firstName,
      req.body?.lastName,
      req.body?.balance,
      req.body?.balanceCurrency
    );
    res.status(200).json({
      message: "User updated",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export { editUser };
