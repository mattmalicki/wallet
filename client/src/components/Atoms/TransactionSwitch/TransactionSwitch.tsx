import React, { MouseEventHandler } from "react";
import styles from "./TransactionSwitch.module.css";

// types
import { ActionT } from "../../../pages/Home/Home";
import { TransactionT } from "../../Organisms/TransactionForm/TransactionForm";

interface TSwitchProp {
  actionType: ActionT;
  transactionType: TransactionT;
  switchHandler: MouseEventHandler<HTMLButtonElement>;
  textHandler: MouseEventHandler<HTMLInputElement>;
}

const TransactionSwitch: React.FC<TSwitchProp> = (props) => {
  return (
    <div className={styles.transactionSwitch}>
      <input id={props.transactionType} hidden />
      <input
        className={
          props.transactionType === "income"
            ? styles[`${props.transactionType}Text`]
            : styles.test
        }
        type="button"
        onClick={props.textHandler}
        value="Income"
      />
      {props.actionType === "add" && (
        <button
          type="button"
          className={styles.switch}
          onClick={props.switchHandler}
        >
          <div
            className={[styles.switchIcon, styles[props.transactionType]].join(
              " "
            )}
          >
            {props.transactionType === "income" ? "+" : "-"}
          </div>
        </button>
      )}
      {props.actionType === "edit" && (
        <div className={styles[props.transactionType + "Text"]}>/</div>
      )}
      <input
        className={
          props.transactionType === "expense"
            ? styles[`${props.transactionType}Text`]
            : styles.test
        }
        type="button"
        onClick={props.textHandler}
        value="Expense"
      />
    </div>
  );
};

export { TransactionSwitch };
