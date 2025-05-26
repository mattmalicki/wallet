"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = void 0;
const db_helpers_1 = require("./db-helpers");
const editUser = async (req, res, next) => {
    var _a, _b, _c, _d;
    try {
        const id = req.user.id;
        const user = await (0, db_helpers_1.updateUser)(id, (_a = req.body) === null || _a === void 0 ? void 0 : _a.email, (_b = req.body) === null || _b === void 0 ? void 0 : _b.password, (_c = req.body) === null || _c === void 0 ? void 0 : _c.firstName, (_d = req.body) === null || _d === void 0 ? void 0 : _d.lastName);
        res.status(200).json({
            message: "User updated",
            user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editUser = editUser;
