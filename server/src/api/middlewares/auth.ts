import { IUser } from "../../models/user";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Token } from "../../models/token";

const authMiddleware: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (error: Error, user: IUser) => {
      if (error || !user) {
        // throw new Error("Token is invalid");
        console.log(error);
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export { authMiddleware };
