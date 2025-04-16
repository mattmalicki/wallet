import { FC, MouseEventHandler } from "react";
import { TransactionItem } from "../TransactionItem/TransactionItem";
import { useTransactions } from "../../../hooks/useTransactions";
import styles from "./TransactionList.module.css";

interface TransactionListProp {
  editHandler: MouseEventHandler<HTMLButtonElement>;
}

const TransactionList: FC<TransactionListProp> = (props) => {
  const { transactions } = useTransactions();

  return (
    <ul className={styles.transactionList}>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction._id}
          transaction={transaction}
          editHandler={props.editHandler}
        />
      ))}
    </ul>
  );
};

export { TransactionList };
