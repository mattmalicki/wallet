import { RequestHandler } from "express";
import { BadRequestError } from "../../../config/classes";
import { loginUser } from "./db-helpers";
import { signAccessToken, signRefreshToken } from "../../helpers/token-helper";
import { Token } from "../../../models/token";
import { refreshTokenCookieName } from "../../../config/secrets";

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
    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    await Token.findOneAndUpdate(
      {
        userId: user.id,
      },
      {
        $set: {
          refreshToken: refreshToken,
          status: true,
          createdAt: Date.now(),
          expiresIn: Date.now() + 100 * 60 * 60 * 24 * 30,
        },
      }
    );

    await user.getBalance();
    user.save();

    res.cookie(refreshTokenCookieName, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/auth/refresh",
    });

    res.status(200).json({
      message: "Login successfull",
      accessToken,
      refreshToken,
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

export { signinUser };
