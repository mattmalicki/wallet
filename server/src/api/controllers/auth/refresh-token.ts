import { RequestHandler } from "express";
import { BadRequestError } from "../../../config/classes";
import { checkRefreshToken, signAccessToken } from "../../helpers/token-helper";
import { Token } from "../../../models/token";

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

export { refreshToken };
