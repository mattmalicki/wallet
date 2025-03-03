import { Request } from "express";

interface AuthReq extends Request {
  user: { id: string };
}

export { AuthReq };
