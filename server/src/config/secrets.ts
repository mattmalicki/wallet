import { config } from "dotenv";
config();

const {
  PORT,
  DB_URI,
  JWT_SERCET_KEY,
  JWT_REFRESH_SECRET_KEY,
  MY_SIMPLE_WALLET_ACCESS_TOKEN,
  MY_SIMPLE_WALLET_REFRESH_TOKEN,
} = process.env;

export const jwtRefreshSecretKey = JWT_REFRESH_SECRET_KEY as string;
export const port = (PORT as unknown as number) ?? 3000;
export const jwtSecretKey = JWT_SERCET_KEY as string;
export const dbUri = DB_URI as string;
export const accessTokenCookieName = MY_SIMPLE_WALLET_ACCESS_TOKEN as string;
export const refreshTokenCookieName = MY_SIMPLE_WALLET_REFRESH_TOKEN as string;
