import { FC } from "react";
import styles from "./TransactionInputItem.module.css";
import { IconSvg } from "../Icon/Icon";

type TIINameOpt = "date" | "amount" | "comment";

interface TIIProp {
  name: TIINameOpt;
}

const TransactionInputItem: FC<TIIProp> = (props) => {
  function inputType(): string {
    if (props.name === "date") return "date";
    if (props.name === "amount") return "number";
    return "text";
  }
  return (
    <div className={styles.TransactionInputItem}>
      <input id={props.name} type={inputType()} className={styles.input} />
      {props.name === "date" && (
        <button className={styles.icon}>
          <IconSvg name={props.name} />
        </button>
      )}
    </div>
  );
};

export { TransactionInputItem };
