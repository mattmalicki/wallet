import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TRANSACTIONS_ENDPOINT = process.env.REACT_APP_TRANSACTIONS_ENDPOINT; // transactions/

const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transaction: TransactionType, thunkAPI) => {
    try {
      const response = await axios.post(
        `${TRANSACTIONS_ENDPOINT}`,
        transaction
      );
      return response.data.transaction;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchTransactionsWithQuery = createAsyncThunk(
  "transactions/fetchWithQuery",
  async (query: { month: number; year: number }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${TRANSACTIONS_ENDPOINT}?month=${query.month}&year=${query.year}`
      );
      console.log(response.data.transactions);
      return response.data.transactions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getTransactions = createAsyncThunk(
  "transactions/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${TRANSACTIONS_ENDPOINT}`);
      return response.data.transactions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const editTransaction = createAsyncThunk(
  "transactions/edit",
  async (data: { id: string; newTransaction: TransactionType }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${TRANSACTIONS_ENDPOINT}update/${data.id}`,
        data.newTransaction
      );
      return response.data.transaction;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (transactionId: string, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${TRANSACTIONS_ENDPOINT}delete/${transactionId}`
      );
      return response.data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export {
  addTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
  fetchTransactionsWithQuery,
};

type TransactionType = {
  _id?: string;
  type?: "+" | "-";
  amount?: number;
  categoryId?: string;
  childCategoryId?: string;
  createdAt?: Date;
  comment?: string;
};

export type { TransactionType };
