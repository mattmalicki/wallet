import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  verified: boolean;
}

interface IUserMethods {
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
  setToken(token: string): void;
  clearToken(): void;
  getToken(): [boolean, string];
  isVerified(): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, IUserMethods, UserModel>({
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
  token: {
    type: String,
    default: null,
    select: false,
  },

  verified: {
    type: Boolean,
    default: false,
    select: false,
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

userSchema.methods.getToken = function () {
  return this.token;
};

userSchema.methods.isVerified = function () {
  return this.verified;
};

const User = model<IUser, UserModel>("user", userSchema);

export { User, IUser };
