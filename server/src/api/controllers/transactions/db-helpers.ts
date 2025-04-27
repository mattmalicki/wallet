import { Types } from "mongoose";
import {
  Transaction,
  ITransaction,
  TransactionType,
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

async function getTransactionsWithQuery(
  userId: string,
  month: number,
  year: number
) {
  function lastDay(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
  }
  const date = new Date(`${year}-${month}`);
  const transactions = await Transaction.find({
    userId: new Types.ObjectId(userId),
    createdAt: { $gte: date, $lte: lastDay(date) },
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

async function updateTransaction(reqTransaction: {
  userId: string;
  id: string;
  type?: string;
  amount?: number;
  categoryId?: string;
  childCategoryId?: string;
  comment?: string;
  createdAt?: Date;
}) {
  const transaction = await Transaction.findOne({
    _id: new Types.ObjectId(reqTransaction.id),
    userId: new Types.ObjectId(reqTransaction.userId),
  });
  if (!transaction) {
    throw new BadRequestError({ message: "Unauthorized." });
  }
  if (reqTransaction.type) {
    if (reqTransaction.type.toLowerCase() === "-")
      transaction.type = TransactionType.expense;
    if (reqTransaction.type.toLowerCase() === "+")
      transaction.type = TransactionType.income;
  }
  if (reqTransaction.amount) {
    transaction.amount = reqTransaction.amount;
  }

  if (reqTransaction.categoryId) {
    transaction.categoryId = new Types.ObjectId(reqTransaction.categoryId);
  }
  if (reqTransaction.childCategoryId) {
    transaction.childCategoryId = new Types.ObjectId(
      reqTransaction.childCategoryId
    );
  }

  if (reqTransaction.comment) {
    transaction.comment = reqTransaction.comment;
  }

  if (reqTransaction.createdAt) {
    transaction.createdAt = reqTransaction.createdAt;
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
  getTransactionsWithQuery,
};
