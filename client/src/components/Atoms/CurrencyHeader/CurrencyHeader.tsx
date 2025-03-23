import { FC } from "react";
import styles from "./CurrencyHeader.module.css";

const CurrencyHeader: FC = () => {
  return (
    <div className={styles.currencyHeader}>
      <span>Currency</span>
      <span>Purchase</span>
      <span>Sale</span>
    </div>
  );
};

export { CurrencyHeader };
