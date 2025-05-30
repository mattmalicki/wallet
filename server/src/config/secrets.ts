import { config } from "dotenv";
config();

const {
  PORT,
  DB_URI,
  JWT_SERCET_KEY,
  JWT_REFRESH_SECRET_KEY,
  JWT_TOKEN_SECRET_KEY,
} = process.env;

export const jwtRefreshSecretKey = JWT_REFRESH_SECRET_KEY as string;
export const port = (PORT as unknown as number) ?? 3000;
export const jwtSecretKey = JWT_SERCET_KEY as string;
export const dbUri = DB_URI as string;
export const jwtTokenSecretKey = JWT_TOKEN_SECRET_KEY as string;
