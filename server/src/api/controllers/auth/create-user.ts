import { RequestHandler } from "express";
import { IUser } from "../../../models/user";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
} from "./db-helpers";

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createdUser = await registerUser(req.body as IUser);
    if (!createdUser) {
      throw Error("Database error");
    }
    res.json({ message: "Action succesfull", user: createdUser });
  } catch (error) {
    throw Error((error as Error).message);
  }
};

export { createUser };
