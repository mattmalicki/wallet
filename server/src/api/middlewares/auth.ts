import { RequestHandler } from "express";
import passport from "passport";
import { IUser } from "../../models/user";

const authMiddleware: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (error: Error, user: IUser) => {
      if (error || !user) {
        throw new Error("Token is invalid");
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export { authMiddleware };
