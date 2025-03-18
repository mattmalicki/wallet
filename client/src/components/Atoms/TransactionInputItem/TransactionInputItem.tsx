import { FC, MouseEvent, useState } from "react";
import styles from "./TransactionInputItem.module.css";
import { IconSvg } from "../Icon/Icon";
import { InputCategory } from "../InputCategory/InputCategory";

type TIINameOpt = "date" | "amount" | "comment" | "category";

interface TIIProp {
  name: TIINameOpt;
}

const TransactionInputItem: FC<TIIProp> = (props) => {
  function clickHandler() {
    const dateInput = document.getElementById("date") as HTMLInputElement;
    dateInput.showPicker();
  }
  return (
    <div className={styles.transactionInputItem}>
      {props.name === "category" && <InputCategory />}
      {props.name === "date" && (
        <>
          <input type="date" id="date" />
          <button className={styles.icon} onClick={clickHandler}>
            <IconSvg name={props.name} />
          </button>
        </>
      )}
      {props.name === "amount" && (
        <input
          id={props.name}
          type="number"
          step={"0.01"}
          className={styles.input}
          placeholder="0.00"
        />
      )}
      {props.name === "comment" && (
        <input
          id={props.name}
          type="text"
          className={styles.input}
          placeholder="Add comment"
        />
      )}
    </div>
  );
};

export { TransactionInputItem };
