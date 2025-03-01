import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import { port } from "./config/secrets";

const app = express();

app.enable("trust proxy");
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.disable("x-powered-by");
app.disable("etag");

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});

export default app;
