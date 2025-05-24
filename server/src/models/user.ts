import { Document, Model, Schema, Types, model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  balance: number;
  verified: boolean;
  transactions: {
    [x: string]: any;
    id: Types.ObjectId;
  }[];
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
  setToken(token: string): void;
  clearToken(): void;
  isVerified(): boolean;
  addTransaction(transactionId: string): void;
  removeTransaction(transactionId: string): void;
  getBalance(): number;
  updateBalance(value: string): void;
}

interface IUserMethods extends Document {
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
  setToken(token: string): void;
  clearToken(): void;
  isVerified(): boolean;
  addTransaction(transactionId: string): void;
  removeTransaction(transactionId: string): void;
  getWithTransactions(): IUser;
  getBalance(): number;
  updateBalance(value: string): void;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser>({
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
      type: Schema.Types.ObjectId,
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

userSchema.methods.isVerified = function () {
  return this.verified;
};

userSchema.methods.updateBalance = function (value: string) {
  this.balance = this.balance + Number(value);
};

userSchema.methods.getBalance = async function () {
  try {
    const user = await this.populate("transactions");
    const balance = user.transactions.reduce(
      (preV: any, curV: any) => preV + Number(`${curV.type}${curV.amount}`),
      0
    );
    user.balance = balance;
    return balance;
  } catch (error) {
    return error;
  }
};

userSchema.methods.addTransaction = function (
  transactionId: string | Types.ObjectId
) {
  this.transactions.push({ _id: transactionId });
};

userSchema.methods.removeTransaction = function (
  transactionId: string | Types.ObjectId
) {
  this.transactions.pull({ _id: transactionId });
};

const User = model<IUser, UserModel>("user", userSchema);

export { User, IUser };
