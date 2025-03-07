import { Types } from "mongoose";
import {
  Transaction,
  ITransaction,
  TransactionStatus,
} from "../../../models/transaction";
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
  to?: string,
  value?: number,
  currency?: string,
  status?: string,
  createdAt?: Date
) {
  const transaction = await Transaction.findOne({
    _id: new Types.ObjectId(id),
    userId: new Types.ObjectId(userId),
  });
  if (!transaction) {
    throw new BadRequestError({ message: "Unauthorized." });
  }
  if (to) {
    transaction.to = to;
  }
  if (value) {
    transaction.value = value;
  }
  if (currency) {
    transaction.currency = currency;
  }
  if (status) {
    if (status.toLowerCase() === "pending")
      transaction.status = TransactionStatus.pending;
    if (status.toLowerCase() === "approved")
      transaction.status = TransactionStatus.approved;
    if (status.toLowerCase() === "completed")
      transaction.status = TransactionStatus.completed;
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
