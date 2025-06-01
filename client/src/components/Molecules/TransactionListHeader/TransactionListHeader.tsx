import { FC } from "react";
import styles from "./TransactionListHeader.module.css";

const TransactionListHeader: FC = () => {
  return (
    <div className={styles.transactionListHeader}>
      <span className={styles.text}>Date</span>
      <span className={styles.text}>Type</span>
      <span className={styles.text}>Category</span>
      <span className={styles.text}>Comment</span>
      <span className={[styles.text, styles.sum].join(" ")}>Sum</span>
      <span className={styles.text}>{}</span>
    </div>
  );
};

export { TransactionListHeader };
