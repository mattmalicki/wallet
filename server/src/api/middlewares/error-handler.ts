import { ErrorRequestHandler } from "express";
import { CustomError } from "../../config/classes";

const errorMiddleware: ErrorRequestHandler = (error, _req, res, next) => {
  if (error instanceof CustomError) {
    const { statusCode, errors, logging } = error;
    if (logging) {
      console.error(
        JSON.stringify(
          {
            code: error.statusCode,
            errors: error.errors,
            stack: error.stack,
          },
          null,
          2
        )
      );
    }
    res.status(statusCode).send({ errors });
  }
  console.error(JSON.stringify(error, null, 2));
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};

export { errorMiddleware };
