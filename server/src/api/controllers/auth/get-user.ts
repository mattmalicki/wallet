import { RequestHandler } from "express";
import { getUser } from "./db-helpers";
import { AuthReq } from "../../../config/interfaces";

const fetchUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await getUser((req as AuthReq).user.id);
    res.status(200).json({ message: "Action succesfull", user });
  } catch (error) {
    next(error);
  }
};

export { fetchUser };
