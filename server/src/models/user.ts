import { Model, Schema, Types, model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  balance: number;
  verified: boolean;
  transactions: { id: Types.ObjectId }[];
}

interface IUserMethods {
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
  setToken(token: string): void;
  clearToken(): void;
  isVerified(): boolean;
  updateBalance(lastTransactionValue: number): number;
  addTransaction(transactionId: string): void;
  removeTransaction(transactionId: string): void;
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
  balance: {
    type: Number,
    default: 0,
  },
  verified: {
    type: Boolean,
    default: false,
    select: false,
  },
  transactions: [
    {
      type: Types.ObjectId,
      ref: "transaction",
    },
  ],
});

userSchema.methods.setPassword = function (password: string) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getBalance = function () {
  return this.balance.toString() + "" + this.balanceCurrency;
};

userSchema.methods.isVerified = function () {
  return this.verified;
};

userSchema.methods.updateBalance = async function (
  lastTransactionValue?: number
) {
  const transactionList = await (this as UserModel).populate({}, "transaction");
  return transactionList;
  // this.balance = this.balance - lastTransactionValue;
  // return this.balance;
};

userSchema.methods.addTransaction = function (
  transactionId: string | Types.ObjectId
) {
  this.transactions.push({ _id: transactionId });
  this.save();
};

userSchema.methods.removeTransaction = function (
  transactionId: string | Types.ObjectId
) {
  this.transactions.pull({ _id: transactionId });
  this.save();
};

const User = model<IUser, UserModel>("user", userSchema);

export { User, IUser };
