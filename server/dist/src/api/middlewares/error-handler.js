"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const classes_1 = require("../../config/classes");
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof classes_1.CustomError) {
        const { statusCode, errors, logging } = error;
        if (logging) {
            console.error(JSON.stringify({
                code: error.statusCode,
                errors: error.errors,
                stack: error.stack,
            }, null, 2));
        }
        res.status(statusCode).send({ errors });
    }
    console.log(error);
    console.error(JSON.stringify(error, null, 2));
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
exports.errorMiddleware = errorMiddleware;
