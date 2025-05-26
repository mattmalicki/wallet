"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const secrets_1 = require("./secrets");
mongoose_1.default.set("strictQuery", true);
mongoose_1.default
    .connect(secrets_1.dbUri, {})
    .then(() => {
    console.log("Sucessfull connection with MongoDB.");
})
    .catch((error) => {
    console.log(error);
});
