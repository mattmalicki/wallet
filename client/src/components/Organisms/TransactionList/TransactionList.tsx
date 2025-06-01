import { FC, MouseEventHandler } from "react";
import { TransactionItem } from "../TransactionItem/TransactionItem";
import { useTransactions } from "../../../hooks/useTransactions";
import styles from "./TransactionList.module.css";
import { TransactionListHeader } from "../../Molecules/TransactionListHeader/TransactionListHeader";

interface TransactionListProp {
  editHandler: MouseEventHandler;
  deleteHandler: MouseEventHandler;
}

const TransactionList: FC<TransactionListProp> = (props) => {
  const { transactions } = useTransactions();

  return (
    <div className={styles.transactionList}>
      <TransactionListHeader />
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction._id}
          transaction={transaction}
          editHandler={props.editHandler}
          deleteHandler={props.deleteHandler}
        />
      ))}
    </div>
  );
};

export { TransactionList };
