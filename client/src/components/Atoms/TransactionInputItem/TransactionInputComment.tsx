import { FC, useState, ChangeEvent, useEffect } from "react";
import styles from "./TransactionInputComment.module.css";

interface TICProp {
  value?: string;
}

const TransactionInputComment: FC<TICProp> = (props) => {
  const [value, setValue] = useState<string>();

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);

  return (
    <input
      id="comment"
      type="text"
      className={styles.input}
      placeholder="Add comment"
      value={value}
      onChange={changeHandler}
    />
  );
};

export { TransactionInputComment };
