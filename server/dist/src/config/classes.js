"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
class BadRequestError extends CustomError {
    constructor(params) {
        const { code, message, logging } = params || {};
        super(message !== null && message !== void 0 ? message : "Bad request");
        this._code = code !== null && code !== void 0 ? code : BadRequestError._statusCode;
        this._logging = logging || false;
        this._context = (params === null || params === void 0 ? void 0 : params.context) || {};
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    get errors() {
        return [{ message: this.message, context: this._context }];
    }
    get statusCode() {
        return this._code;
    }
    get logging() {
        return this._logging;
    }
}
exports.BadRequestError = BadRequestError;
BadRequestError._statusCode = 400;
