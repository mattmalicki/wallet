import { IUser } from "../../models/user";
import { RequestHandler } from "express";
import passport from "passport";
import { BadRequestError } from "../../config/classes";

const authMiddleware: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (error: Error, user: IUser) => {
      if (error || !user) {
        throw new BadRequestError({ message: "Token is invalid" });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export { authMiddleware };
