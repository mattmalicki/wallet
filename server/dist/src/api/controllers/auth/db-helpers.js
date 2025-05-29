"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.loginUser = exports.registerUser = void 0;
const classes_1 = require("../../../config/classes");
const user_1 = require("../../../models/user");
async function registerUser(user) {
    const { email, password, firstName, lastName } = user;
    if (await user_1.User.findOne({ email })) {
        throw new classes_1.BadRequestError({
            code: 400,
            message: "Unable to create user, try different email.",
        });
    }
    const createdUser = new user_1.User({ email, firstName, lastName });
    createdUser.setPassword(password);
    await createdUser.save();
    return createdUser;
}
exports.registerUser = registerUser;
async function loginUser(email, password) {
    const user = await user_1.User.findOne({ email }).select(["+password", "+verified"]);
    if (!user || !user.validatePassword(password)) {
        throw new classes_1.BadRequestError({
            code: 401,
            message: "Invalid email or password",
        });
    }
    if (!user.verified) {
        throw new classes_1.BadRequestError({ code: 401, message: "User not verified." });
    }
    return user;
}
exports.loginUser = loginUser;
async function getUser(id) {
    const user = await user_1.User.findById(id);
    if (!user) {
        throw new classes_1.BadRequestError({
            code: 401,
            message: "Unable to find user.",
            context: { from: "getUser_DB" },
        });
    }
    return user;
}
exports.getUser = getUser;
async function updateUser(id, email, password, firstName, lastName) {
    const user = await user_1.User.findById(id);
    if (!user) {
        throw new classes_1.BadRequestError({
            code: 401,
            message: "Unable to find user.",
            context: { from: "updateUser_DB" },
        });
    }
    if (email) {
        user.email = email;
    }
    if (password) {
        user.setPassword(password);
    }
    if (firstName) {
        user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
    }
    user.save();
    return user;
}
exports.updateUser = updateUser;
async function deleteUser(id) {
    await user_1.User.findByIdAndDelete(id);
}
exports.deleteUser = deleteUser;
