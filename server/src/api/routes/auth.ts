import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createUser,
  fetchUser,
  signinUser,
  signoutUser,
  editUser,
  removeUser,
  refreshToken,
} from "../controllers/auth/create-user";

export const authRouter = Router();

authRouter.post("/", createUser);
authRouter.get("/", authMiddleware, fetchUser);
authRouter.post("/login", signinUser);
authRouter.post("/logout", authMiddleware, signoutUser);
authRouter.post("/refresh", refreshToken);
authRouter.patch("/update", authMiddleware, editUser);
authRouter.delete("/delete", authMiddleware, removeUser);
