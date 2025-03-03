import { RequestHandler } from "express";
import passport from "passport";
import { AuthReq } from "../../config/global";

const authMiddleware: RequestHandler = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error || !user) {
      throw new Error("Token is invalid");
    }
    (req as AuthReq).user = user;
    next();
  })(req, res, next);
};

export { authMiddleware };
