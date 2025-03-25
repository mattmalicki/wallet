import { FC } from "react";
import styles from "./TransactionFrom.module.css";
import { TransactionSwitch } from "../../Atoms/TransactionSwitch/TransactionSwitch";
import { TransactionInputItem } from "../../Atoms/TransactionInputItem/TransactionInputItem";
import { Button } from "../../Atoms/Button/Button";

interface TFProp {
  isEdit?: boolean;
}

const TransactionFrom: FC<TFProp> = (props) => {
  return (
    <form className={styles.transactionFrom}>
      <TransactionSwitch actionType={props.isEdit ? "edit" : "add"} />
      {props.isEdit && <TransactionInputItem name="category" />}
      <TransactionInputItem name="amount" />
      <TransactionInputItem name="date" />
      <TransactionInputItem name="comment" />
      <div className={styles.buttons}>
        <Button title="add" colored />
        <Button title="cancel" colored={false} />
      </div>
    </form>
  );
};

export { TransactionFrom };
