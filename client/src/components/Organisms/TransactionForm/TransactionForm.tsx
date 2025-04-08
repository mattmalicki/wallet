import { FC, MouseEventHandler } from "react";
import styles from "./TransactionForm.module.css";
import { TransactionSwitch } from "../../Atoms/TransactionSwitch/TransactionSwitch";
import { TransactionInputItem } from "../../Atoms/TransactionInputItem/TransactionInputItem";
import { Button } from "../../Atoms/Button/Button";

interface TFProp {
  isEdit?: boolean;
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
}

const TransactionFrom: FC<TFProp> = (props) => {
  return (
    <form className={styles.transactionFrom}>
      <h2>{!props.isEdit ? "Add transaction" : "Edit transaction"}</h2>
      <TransactionSwitch actionType={!props.isEdit ? "add" : "edit"} />
      <TransactionInputItem name="category" />
      <TransactionInputItem name="amount" />
      <TransactionInputItem name="date" />
      <TransactionInputItem name="comment" />
      <div className={styles.buttons}>
        <Button title={!props.isEdit ? "add" : "edit"} colored />
        <Button
          title="cancel"
          colored={false}
          clickHandler={props.handleCloseModal}
        />
      </div>
    </form>
  );
};

export { TransactionFrom };
