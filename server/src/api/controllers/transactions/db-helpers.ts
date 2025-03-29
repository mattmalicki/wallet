import { Types } from "mongoose";
import {
  Transaction,
  ITransaction,
  TransactionType,
} from "../../../models/transaction";
import { getUser } from "../auth/db-helpers";
import { BadRequestError } from "../../../config/classes";

async function addTransaction(transaction: ITransaction) {
  const newTransaction = new Transaction(transaction);
  return newTransaction;
}

async function getTransactions(userId: string) {
  const transactions = await Transaction.find({
    userId: new Types.ObjectId(userId),
  });
  return transactions;
}

async function getOneTransaction(userId: string, id: string) {
  const transactions = await Transaction.find({
    _id: new Types.ObjectId(id),
    userId: new Types.ObjectId(userId),
  });
  return transactions;
}

async function updateTransaction(
  userId: string,
  id: string,
  type?: string,
  amount?: number,
  createdAt?: Date
) {
  const transaction = await Transaction.findOne({
    _id: new Types.ObjectId(id),
    userId: new Types.ObjectId(userId),
  });
  if (!transaction) {
    throw new BadRequestError({ message: "Unauthorized." });
  }
  if (type) {
    if (type.toLowerCase() === "-") transaction.type = TransactionType.expense;
    if (type.toLowerCase() === "+") transaction.type = TransactionType.income;
  }
  if (amount) {
    transaction.amount = amount;
  }

  if (createdAt) {
    transaction.createdAt = createdAt;
  }
  transaction.save();
  return transaction;
}

async function deleteTransaction(userId: string, id: string) {
  await Transaction.findOneAndDelete({
    _id: new Types.ObjectId(id),
    userId: new Types.ObjectId(userId),
  });
}

export {
  addTransaction,
  getTransactions,
  getOneTransaction,
  updateTransaction,
  deleteTransaction,
};
