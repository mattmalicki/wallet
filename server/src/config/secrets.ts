import { config } from "dotenv";
config();

const { PORT, DB_URI, JWT_SERCET_KEY } = process.env;

export const port = (PORT as unknown as number) ?? 3000;
export const jwtSecretKey = JWT_SERCET_KEY as string;
export const dbUri = DB_URI as string;
