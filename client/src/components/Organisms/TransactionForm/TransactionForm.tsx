import { FC, MouseEventHandler } from "react";
import styles from "./TransactionForm.module.css";
import { TransactionSwitch } from "../../Atoms/TransactionSwitch/TransactionSwitch";
import { TransactionInputItem } from "../../Atoms/TransactionInputItem/TransactionInputItem";
import { Button } from "../../Atoms/Button/Button";
import { useActionContext } from "../../../hooks/useActionTypeContext";

interface TFProp {
  isEdit?: boolean;
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
}

const TransactionFrom: FC<TFProp> = (props) => {
  const { actionType } = useActionContext();

  return (
    <form className={styles.transactionFrom}>
      <h2>{!props.isEdit ? "Add transaction" : "Edit transaction"}</h2>
      <TransactionSwitch actionType={actionType} />
      {props.isEdit && <TransactionInputItem name="category" />}
      <TransactionInputItem name="amount" />
      <TransactionInputItem name="date" />
      <TransactionInputItem name="comment" />
      <div className={styles.buttons}>
        <Button title="add" colored />
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
