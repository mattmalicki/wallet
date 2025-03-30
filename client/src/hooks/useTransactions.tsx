import { useSelector } from "react-redux";
import {
  selectTransaction,
  selectTransactionsError,
  selectIsRefreshing,
} from "../redux/transactions/selector";

const useTransactions = () => {
  const transactions = useSelector(selectTransaction);
  const transactionsRefresh = useSelector(selectIsRefreshing);
  const transactionsError = useSelector(selectTransactionsError);
  return { transactions, transactionsRefresh, transactionsError };
};

export { useTransactions };
