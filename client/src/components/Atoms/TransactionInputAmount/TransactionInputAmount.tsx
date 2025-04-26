import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./TransactionInputAmount.module.css";

interface TIAProp {
  value?: string;
}

const TransactionInputAmount: FC<TIAProp> = (props) => {
  const [value, setValue] = useState<string>();

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }
  useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);
  return (
    <input
      id="amount"
      type="number"
      step={"0.01"}
      className={styles.input}
      placeholder="0.00"
      required
      value={value}
      onChange={changeHandler}
    />
  );
};

export { TransactionInputAmount };
