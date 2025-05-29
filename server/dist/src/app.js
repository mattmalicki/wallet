"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const secrets_1 = require("./config/secrets");
const error_handler_1 = require("./api/middlewares/error-handler");
const auth_1 = require("./api/routes/auth");
const transactions_1 = require("./api/routes/transactions");
const categories_1 = require("./api/routes/categories");
const app = (0, express_1.default)();
app.enable("trust proxy");
app.use((0, cors_1.default)({
    origin: secrets_1.clientDomain,
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.disable("x-powered-by");
app.disable("etag");
app.use("/auth", auth_1.authRouter);
app.use("/transactions", transactions_1.transactionRouter);
app.use("/categories", categories_1.categoriesRouter);
app.use(error_handler_1.errorMiddleware);
app.listen(secrets_1.port, (err) => {
    if (err) {
        console.log(err);
        return process.exit(1);
    }
    console.log(`Server is running on ${secrets_1.port}`);
});
exports.default = app;
