import { RequestHandler } from "express";
import { getUser } from "./db-helpers";
import { AuthReq } from "../../../config/interfaces";

const fetchUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await getUser((req as AuthReq).user.id);
    res.status(200).json({
      message: "Action succesfull",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        balance: user.balance,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { fetchUser };
