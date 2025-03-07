import { Schema, Types, model } from "mongoose";

enum TransactionStatus {
  pending = "PENDING",
  approved = "APPROVED",
  completed = "COMPLETED",
}

interface ITransaction {
  userId: Types.ObjectId;
  to: string;
  value: number;
  category: string;
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
  category: {
    type: String,
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
    type: String,
    default: TransactionStatus.completed,
  },
});

const Transaction = model("transaction", transactionSchema);

export { Transaction, ITransaction, TransactionStatus };
