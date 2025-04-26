import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isPendingAction, isRejectAction } from "../helper";
import {
  addTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
} from "./operations";

interface ITransaction {
  _id: string;
  userId: string;
  type: "+" | "-";
  amount: number;
  comment: string;
  categoryId: string;
  childCategoryId: string;
  createdAt: Date;
}

interface TransactionState {
  transactions: ITransaction[];
  isRefreshing: boolean;
  transactionError: any;
}

const initialState: TransactionState = {
  transactions: [],
  isRefreshing: false,
  transactionError: null,
};

const handlePendingAction = (state: TransactionState) => {
  state.isRefreshing = true;
  state.transactionError = null;
};

const handleRejectedAction = (
  state: TransactionState,
  action: PayloadAction
) => {
  state.transactions = [];
  state.isRefreshing = false;
  state.transactionError = action.payload;
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.isRefreshing = false;
        state.transactionError = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        state.isRefreshing = false;
        state.transactionError = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (item) => item._id !== action.payload
        );
        state.isRefreshing = false;
        state.transactionError = null;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (transaction) => transaction._id === action.payload.id
        );
        state.transactions[index] = action.payload;
        state.isRefreshing = false;
        state.transactionError = null;
      })
      .addMatcher(
        isPendingAction.bind(this, "transactions"),
        handlePendingAction
      )
      .addMatcher(
        isRejectAction.bind(this, "transactions"),
        handleRejectedAction
      );
  },
});

export const transactionsReducer = transactionsSlice.reducer;
