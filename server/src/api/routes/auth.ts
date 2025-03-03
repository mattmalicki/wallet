import { Router } from "express";
import {
  createUser,
  fetchUser,
  login,
  logout,
  update,
  remove,
  middleware,
} from "../controllers/auth/create-user";

export const authRouter = Router();

authRouter.post("/", createUser);
authRouter.get("/", middleware, fetchUser);
authRouter.post("/login", login);
authRouter.post("/logout", middleware, logout);
authRouter.patch("/update", middleware, update);
authRouter.delete("/delete", middleware, remove);
