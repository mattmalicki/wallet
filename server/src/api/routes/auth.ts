import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { createUser } from "../controllers/auth/create-user";
import { fetchUser } from "../controllers/auth/get-user";
import { signinUser } from "../controllers/auth/login-user";
import { signoutUser } from "../controllers/auth/logout-user";
import { editUser } from "../controllers/auth/edit-user";
import { removeUser } from "../controllers/auth/delete-user";
import { refreshToken } from "../controllers/auth/refresh-token";

export const authRouter = Router();

authRouter.post("/", createUser);
authRouter.get("/", authMiddleware, fetchUser);
authRouter.post("/login", signinUser);
authRouter.post("/logout", authMiddleware, signoutUser);
authRouter.post("/refresh", refreshToken);
authRouter.patch("/update", authMiddleware, editUser);
authRouter.delete("/delete", authMiddleware, removeUser);
