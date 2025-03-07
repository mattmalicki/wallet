import { RequestHandler } from "express";
import { IUser } from "../../../models/user";
import { AuthReq } from "../../../config/interfaces";
import { BadRequestError } from "../../../config/classes";
import {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  deleteUser,
} from "./db-helpers";
import { Token } from "../../../models/token";
import {
  checkRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "../../helpers/token-helper";

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createdUser = await registerUser(req.body as IUser);
    if (!createdUser) {
      throw new BadRequestError({ code: 400, message: "Database error" });
    }
    const accesToken = signAccessToken(createdUser.id);
    const refreshToken = signRefreshToken(createdUser.id);
    const token = new Token({
      userId: createdUser.id,
      refreshToken: refreshToken,
      status: true,
      createdAt: Date.now(),
      expiresIn: Date.now() + 100 * 60 * 60 * 24 * 30,
    });
    token.save();

    res.json({
      message: "User created.",
      accesToken,
      refreshToken,
      user: {
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

const fetchUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await getUser((req as AuthReq).user.id);
    res.status(200).json({ message: "Action succesfull", user });
  } catch (error) {
    next(error);
  }
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
          expiresIn: Date.now() + 100 * 60 * 60 * 24 * 30,
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

const editUser: RequestHandler = async (req, res, next) => {
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
    next(error);
  }
};

const removeUser: RequestHandler = async (req, res, next) => {
  try {
    await deleteUser((req as AuthReq).user.id);
    await Token.findOneAndDelete({ userId: (req as AuthReq).user.id });
    res.status(200).json({ message: "Account has been deleted." });
  } catch (error) {
    next(error);
  }
};

const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const reqToken = req.body.refreshToken;
    if (!reqToken) throw new BadRequestError({ message: "Missing token" });

    const payload = checkRefreshToken(reqToken);
    if (payload.message)
      throw new BadRequestError({ message: "Token is invalid" });

    const userId = (payload as { id: string }).id;
    const userToken = await Token.findOne({
      userId: userId,
    });
    if (!userToken || userToken.refreshToken !== reqToken)
      throw new BadRequestError({ message: "Token is invalid" });

    if (userToken.expiresIn <= Date.now() || !userToken.status)
      throw new BadRequestError({ message: "Token is expired" });

    const accessToken = signAccessToken(userId);

    res.status(200).json({ message: "New access token signed", accessToken });
  } catch (error) {
    next(error);
  }
};

export {
  createUser,
  fetchUser,
  signinUser,
  editUser,
  signoutUser,
  removeUser,
  refreshToken,
};
