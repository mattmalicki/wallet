import React, { MouseEvent, useEffect, useState } from "react";
import styles from "./TransactionSwitch.module.css";

type ActionT = "add" | "edit";
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

  function clickTextHandler(event: MouseEvent<HTMLButtonElement>) {
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
      <button
        className={currentText === "income" ? styles[`${currentText}Text`] : ""}
        id="income"
        onClick={clickTextHandler}
      >
        Income
      </button>
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
      {props.actionType === "edit" && <div>/</div>}
      <button
        className={
          currentText === "expense" ? styles[`${currentText}Text`] : ""
        }
        id="expense"
        onClick={clickTextHandler}
      >
        Expense
      </button>
    </div>
  );
};

export { TransactionSwitch };
