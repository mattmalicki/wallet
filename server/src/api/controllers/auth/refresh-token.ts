import { RequestHandler } from "express";
import { BadRequestError } from "../../../config/classes";
import { checkRefreshToken, signAccessToken } from "../../helpers/token-helper";
import { Token } from "../../../models/token";
import { User } from "../../../models/user";
import { refreshTokenCookieName } from "../../../config/secrets";

const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies[refreshTokenCookieName];
    console.log(refreshToken);
    if (!refreshToken)
      throw new BadRequestError({ code: 401, message: "Missing token" });

    const payload = checkRefreshToken(refreshToken);
    if (payload.message)
      throw new BadRequestError({ code: 401, message: "Token is invalid" });

    const userId = (payload as { id: string }).id;
    const user = await User.findById(userId);
    const userToken = await Token.findOne({
      userId: userId,
    });
    if (!userToken || userToken.refreshToken !== refreshToken)
      throw new BadRequestError({ code: 401, message: "Token is invalid" });

    if (userToken.expiresIn <= Date.now() || !userToken.status)
      throw new BadRequestError({ code: 401, message: "Token is expired" });
    if (!user)
      throw new BadRequestError({ code: 401, message: "User is not valid" });

    const accessToken = signAccessToken(userId);

    res.status(200).json({
      message: "New access token signed",
      accessToken,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        balance: user.balance,
      },
    });
  } catch (error) {
    res.clearCookie(refreshTokenCookieName);
    next(error);
  }
};

export { refreshToken };
