import { jwtSecretKey } from "./secrets";
import passportJWT from "passport-jwt";
import { User } from "../models/user";
import { Request } from "express";
import { Types } from "mongoose";
import passport from "passport";

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: jwtSecretKey,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    },
    (req: Request, payload: { id: string }, done) => {
      User.find({
        _id: new Types.ObjectId(payload.id),
        token: req.headers.authorization?.split(" ")[1],
        verified: true,
      })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(new Error("Token is invalid"), null);
        })
        .catch((error) => {
          return done(error, null);
        });
    }
  )
);
