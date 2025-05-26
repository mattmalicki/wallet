import { RequestHandler } from "express";
import { getUser } from "./db-helpers";
import { AuthReq } from "../../../config/interfaces";
import { Token } from "../../../models/token";
import { refreshTokenCookieName } from "../../../config/secrets";

const signoutUser: RequestHandler = async (req, res, next) => {
  try {
    await getUser((req as AuthReq).user.id);
    await Token.findOneAndUpdate(
      { userId: (req as AuthReq).user.id },
      { $set: { status: false } }
    );
    res.clearCookie(refreshTokenCookieName);
    res.json({ message: "Logged out without problems." });
  } catch (error) {
    next(error);
  }
};

export { signoutUser };
