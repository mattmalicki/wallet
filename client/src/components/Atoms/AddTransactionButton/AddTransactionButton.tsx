import { FC, MouseEventHandler } from "react";
import styles from "./AddTransactionButton.module.css";
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
      {"+"}
    </button>
  );
};

export { AddTransactionButton };
