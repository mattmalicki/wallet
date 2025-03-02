import { Router } from "express";
import { createUser } from "../controllers/auth/create-user";

export const authRouter = Router();

authRouter.post("/", createUser);
