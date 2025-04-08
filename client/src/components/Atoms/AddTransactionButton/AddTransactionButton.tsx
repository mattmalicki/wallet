import { FC, MouseEventHandler } from "react";
import styles from "./AddTransactionButton.module.css";
import { IconSvg } from "../Icon/Icon";

interface ATBProp {
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

const AddTransactionButton: FC<ATBProp> = (props) => {
  return (
    <button
      className={styles.addTransactionButton}
      type="button"
      onClick={props.handleClick}
    >
      <IconSvg name={"add-transaction"} stroke="white" />
    </button>
  );
};

export { AddTransactionButton };
