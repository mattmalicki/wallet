import { RequestHandler } from "express";
import { getUser } from "./db-helpers";
import { AuthReq } from "../../../config/interfaces";
import { Token } from "../../../models/token";

const signoutUser: RequestHandler = async (req, res, next) => {
  try {
    await getUser((req as AuthReq).user.id);
    await Token.findOneAndUpdate(
      { userId: (req as AuthReq).user.id },
      { $set: { status: false } }
    );
    res.json({ message: "Logged out without problems." });
  } catch (error) {
    next(error);
  }
};

export { signoutUser };
