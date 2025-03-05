import { RequestHandler } from "express";
import { IUser } from "../../../models/user";
import { AuthReq } from "../../../config/interfaces";
import { BadRequestError } from "../../../config/classes";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
  deleteUser,
} from "./db-helpers";
import { Token } from "../../../models/token";
import { signAccessToken, signRefreshToken } from "../../helpers/token-helper";

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createdUser = await registerUser(req.body as IUser);
    if (!createdUser) {
      throw new BadRequestError({ code: 400, message: "Database error" });
    }
    const accesToken = signAccessToken(createdUser.id);
    const refreshToken = signRefreshToken(createdUser.id);
    const token = new Token({
      userId: createdUser,
      refreshToken: refreshToken,
      status: true,
      createdAt: Date.now(),
      expiresIn: Date.now() + 604800000,
    });
    token.save();

    res.json({
      message: "Action succesfull",
      accesToken,
      refreshToken,
      user: createdUser,
    });
  } catch (error) {
    throw Error((error as Error).message);
  }
};

const fetchUser: RequestHandler = async (req, res) => {
  const user = await getUser((req as AuthReq).user.id);
  res.status(200).json({ message: "Action succesfull", user });
};

const signinUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError({
        code: 400,
        message: "Missing email or password",
      });
    }
    const user = await loginUser(email, password);
    const accesToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    Token.findOneAndUpdate(
      {
        userId: user.id,
      },
      {
        $set: {
          refreshToken: refreshToken,
          createdAt: Date.now(),
          expiresIn: Date.now() + 604800000,
        },
      }
    );

    res.status(200).json({
      message: "Login successfull",
      accesToken,
      refreshToken,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signoutUser: RequestHandler = async (req, res) => {
  try {
    await logoutUser((req as AuthReq).user.id);
    res.json({ message: "Logged out without problems." });
  } catch (error) {
    throw Error((error as Error).message);
  }
};

const editUser: RequestHandler = async (req, res) => {
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

const removeUser: RequestHandler = async (req, res) => {
  try {
    await deleteUser((req as AuthReq).user.id);
    res.status(200).json({ message: "Account has been deleted." });
  } catch (error) {
    throw Error((error as Error).message);
  }
};

export { createUser, fetchUser, signinUser, editUser, signoutUser, removeUser };
