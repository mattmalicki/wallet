import { FC } from "react";
import styles from "./CurrencyListItem.module.css";

interface CLIProp {
  currency: string;
  purchase: string | number;
  sale: string | number;
}

const CurrencyListItem: FC<CLIProp> = (props) => {
  return (
    <div className={styles.currencyListItem}>
      <span>{props.currency}</span>
      <span>{props.purchase}</span>
      <span>{props.sale}</span>
    </div>
  );
};

export { CurrencyListItem };
