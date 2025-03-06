import { jwtSecretKey } from "./secrets";
import passportJWT from "passport-jwt";
import { User } from "../models/user";
import { Request } from "express";
import { Types } from "mongoose";
import passport from "passport";
import { BadRequestError } from "./classes";

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: jwtSecretKey,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    },
    async (req: Request, payload: { id: string }, done) => {
      try {
        const user = await User.findOne({
          _id: new Types.ObjectId(payload.id),
          verified: true,
        });
        if (user) {
          return done(null, user);
        }
        return done(new BadRequestError({ message: "Token is invalid" }), null);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
