import React, { useEffect, useState } from "react";
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
  function toggleAction() {
    setCurrentText((currentState) => {
      if (currentState === "income") return "expense";
      if (currentState === "expense") return "income";
      return "income";
    });
  }
  return (
    <div className={styles.transactionSwitch}>
      <span className={currentText === "income" ? styles.currentText : ""}>
        Income
      </span>
      {props.actionType === "add" && (
        <button type="button" className={styles.switch} onClick={toggleAction}>
          <div className={[styles.switchIcon, styles[currentText]].join(" ")}>
            {currentText === "income" ? "+" : "-"}
          </div>
        </button>
      )}
      {props.actionType === "edit" && <div>/</div>}
      <span className={currentText === "expense" ? styles.currentText : ""}>
        Expense
      </span>
    </div>
  );
};

export { TransactionSwitch };
