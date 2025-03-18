import { FC, MouseEvent, useState } from "react";
import styles from "./TransactionInputItem.module.css";
import { IconSvg } from "../Icon/Icon";
import { CategoryPicker } from "../CategoryPicker/CategoryPicker";

type TIINameOpt = "date" | "amount" | "comment" | "category";

interface TIIProp {
  name: TIINameOpt;
}

const TransactionInputItem: FC<TIIProp> = (props) => {
  const [categoryValue, setCategoryValue] =
    useState<string>("Select a category");

  const [showModal, setShowModal] = useState<boolean>(false);

  function categoryHandler(event: MouseEvent<HTMLButtonElement>) {
    setCategoryValue(event.currentTarget.id);
    setShowModal(false);
  }

  function focusHandler() {
    setShowModal(true);
  }

  function clickHandler() {
    const dateInput = document.getElementById("date") as HTMLInputElement;
    dateInput.showPicker();
  }
  return (
    <div className={styles.transactionInputItem}>
      {props.name === "category" && (
        <div className={styles.categoryContainer}>
          <input id={"category"} value={categoryValue} onFocus={focusHandler} />
          {showModal && <CategoryPicker clickHandler={categoryHandler} />}
        </div>
      )}
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
