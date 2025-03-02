import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  verify: boolean;
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

userSchema.methods.setPassword = function (password: string) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setToken = function (token: string) {
  this.token = token;
};

userSchema.methods.clearToken = function () {
  this.token = null;
};

export const User = model("user", userSchema);
