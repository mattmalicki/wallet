import { Schema, Types, model } from "mongoose";

enum TransactionStatus {
  pending,
  approved,
  completed,
}

interface ITransaction {
  userId: Types.ObjectId;
  to: string;
  value: number;
  currency: string;
  createdAt: Date;
  status: TransactionStatus;
}

const transactionSchema = new Schema<ITransaction>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  to: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  status: {
    type: Number,
    default: TransactionStatus.completed,
  },
});

export const Transaction = model("transaction", transactionSchema);
