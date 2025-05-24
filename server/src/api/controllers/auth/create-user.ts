import { RequestHandler } from "express";
import { IUser } from "../../../models/user";
import { BadRequestError } from "../../../config/classes";
import { registerUser } from "./db-helpers";
import { Token } from "../../../models/token";
import { signAccessToken, signRefreshToken } from "../../helpers/token-helper";

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createdUser = await registerUser(req.body as IUser);
    if (!createdUser) {
      throw new BadRequestError({ code: 400, message: "Database error" });
    }
    const accessToken = signAccessToken(createdUser.id);
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
      accessToken,
      refreshToken,
      user: {
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        balance: createdUser.balance,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { createUser };
