import bodyParser from "body-parser";
import "express-async-errors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { port } from "./config/secrets";
import { errorMiddleware } from "./api/middlewares/error-handler";

import { authRouter } from "./api/routes/auth";
import { transactionRouter } from "./api/routes/transactions";
import { categoriesRouter } from "./api/routes/categories";

const app = express();

app.enable("trust proxy");
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.disable("x-powered-by");
app.disable("etag");

app.use("/auth", authRouter);
app.use("/transactions", transactionRouter);
app.use("/categories", categoriesRouter);

app.use(errorMiddleware);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});

export default app;
