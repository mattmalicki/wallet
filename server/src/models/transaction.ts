import { Schema, Types, model } from "mongoose";

enum TransactionType {
  income = "+",
  expense = "-",
}

interface ITransaction {
  userId: Types.ObjectId;
  type: TransactionType;
  amount: number;
  category: {
    id: Types.ObjectId;
    title: string;
    childCategory: {
      id: Types.ObjectId;
      title: string;
    };
  };
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
  category: {
    type: {
      id: Types.ObjectId,
      title: String,
      childCategory: {
        id: Types.ObjectId,
        title: String,
      },
    },
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Transaction = model("transaction", transactionSchema);

export { Transaction, ITransaction, TransactionType };
