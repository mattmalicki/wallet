import { RequestHandler, Request } from "express";
import { IUser } from "../../../models/user";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
} from "./db-helpers";

interface AuthReq extends Request {
  user: { id: string };
}

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

const fetchUser: RequestHandler = async (req, res) => {
  const user = await getUser((req as AuthReq).user.id);
  res.status(200).json({ message: "Action succesfull", user });
};

const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error("Missing email or password");
    }
    const user = await loginUser(email, password);
    // const payload = {
    //   id: user.id,
    // };
    const token = "asdsafsa"; //Need to implement token
    user.setToken(token);
    await user.save();
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
};

const logout: RequestHandler = async (req, res) => {
  try {
    await logoutUser((req as AuthReq).user.id);
    res.json({ message: "Logged out without problems." });
  } catch (error) {
    throw Error((error as Error).message);
  }
};

const update: RequestHandler = async (req, res) => {
  try {
    const id = (req as AuthReq).user.id;
    const user = await updateUser(
      id,
      req.body?.email,
      req.body?.password,
      req.body?.firstName,
      req.body?.lastName
    );
    res.status(200).json({
      message: "User updated",
      user,
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
};

const middleware: RequestHandler = async (req, res, next) => {
  (req as AuthReq).user = { id: "67c4ac3d6047bd61c4584490" };
  next();
};

export { createUser, fetchUser, login, middleware, update, logout };
