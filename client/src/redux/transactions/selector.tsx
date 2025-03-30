import { RootState } from "../store";

const selectTransaction = (state: RootState) => state.transactions.transactions;
const selectIsRefreshing = (state: RootState) =>
  state.transactions.isRefreshing;
const selectTransactionsError = (state: RootState) =>
  state.transactions.transactionError;

export { selectTransaction, selectIsRefreshing, selectTransactionsError };
