import { Schema, Types, model } from "mongoose";

enum TransactionType {
  income = "+",
  expense = "-",
}

interface ITransaction {
  userId: Types.ObjectId;
  type: TransactionType;
  amount: number;
  categoryId: Types.ObjectId;
  childCategoryId: Types.ObjectId;
  comment: string;
  createdAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "categories",
  },
  childCategoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  comment: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Transaction = model("transaction", transactionSchema);

export { Transaction, ITransaction, TransactionType };
