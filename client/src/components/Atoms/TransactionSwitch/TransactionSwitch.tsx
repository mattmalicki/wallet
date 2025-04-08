import React, { MouseEvent, useEffect, useState } from "react";
import styles from "./TransactionSwitch.module.css";
import { ActionT } from "../../../pages/Home/Home";

type TransactionT = "income" | "expense";

interface TSwitchProp {
  actionType: ActionT;
  transactionType?: TransactionT;
}

const TransactionSwitch: React.FC<TSwitchProp> = (props) => {
  const [currentText, setCurrentText] = useState<TransactionT>("income");

  useEffect(() => {
    props.transactionType && setCurrentText(props.transactionType);
  }, [props]);

  function clickTextHandler(event: MouseEvent<HTMLInputElement>) {
    if (event.currentTarget?.id === "income") setCurrentText("income");
    if (event.currentTarget?.id === "expense") setCurrentText("expense");
  }

  function clickSwitchHandler() {
    setCurrentText((currentState) => {
      if (currentState === "income") return "expense";
      if (currentState === "expense") return "income";
      return "income";
    });
  }
  return (
    <div className={styles.transactionSwitch}>
      <input
        className={
          currentText === "income" ? styles[`${currentText}Text`] : styles.test
        }
        id="income"
        type="button"
        onClick={clickTextHandler}
        value="Income"
      />
      {props.actionType === "add" && (
        <button
          type="button"
          className={styles.switch}
          onClick={clickSwitchHandler}
        >
          <div className={[styles.switchIcon, styles[currentText]].join(" ")}>
            {currentText === "income" ? "+" : "-"}
          </div>
        </button>
      )}
      {props.actionType === "edit" && (
        <div className={styles[currentText + "Text"]}>/</div>
      )}
      <input
        className={
          currentText === "expense" ? styles[`${currentText}Text`] : styles.test
        }
        id="expense"
        type="button"
        onClick={clickTextHandler}
        value="Expense"
      />
    </div>
  );
};

export { TransactionSwitch };
