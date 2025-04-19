import { FC, MouseEventHandler } from "react";
import styles from "./Confirmation.module.css";
import { Button } from "../../Atoms/Button/Button";

interface ConfirmationProp {
  statement: string;
  handleConfirm: MouseEventHandler;
  handleDiscard: MouseEventHandler;
}

const Confirmation: FC<ConfirmationProp> = (props) => {
  return (
    <div className={styles.confirmation}>
      <p>{props.statement}</p>
      <Button title="Yes" colored clickHandler={props.handleConfirm} />
      <Button
        title="Cancel"
        colored={false}
        clickHandler={props.handleDiscard}
      />
    </div>
  );
};

export { Confirmation };
