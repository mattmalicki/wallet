import { FC, MouseEventHandler } from "react";
import styles from "./TransactionItemItem.module.css";
import { IconSvg } from "../../Atoms/Icon/Icon";

interface ValuesProp {
  header: string;
  value: string | number;
}

interface ButtonProp {
  deleteButtonHandler: MouseEventHandler<HTMLButtonElement>;
  editButtonHandler: MouseEventHandler<HTMLButtonElement>;
  id?: string;
}

type Never<T> = { [P in keyof T]?: never };
type OnlyValues = ValuesProp & Never<ButtonProp>;
type OnlyButtons = ButtonProp & Never<ValuesProp>;

const TransactionItemItem: FC<OnlyValues | OnlyButtons> = (props) => {
  return (
    <li className={styles.transactionListItem}>
      {props.header && (
        <span>{props.header[0].toUpperCase() + props.header.slice(1)}</span>
      )}
      {props.value && <span>{props.value}</span>}
      {props.deleteButtonHandler && (
        <button
          onClick={props.deleteButtonHandler}
          className={styles.deleteButton}
          id={props.id}
        >
          Delete
        </button>
      )}
      {props.editButtonHandler && (
        <button
          onClick={props.editButtonHandler}
          className={styles.editButton}
          id={props.id}
        >
          <div className={styles.editButtonIcon}>
            <IconSvg name="edit" fill="none" />
          </div>
          <span>Edit</span>
        </button>
      )}
    </li>
  );
};

export { TransactionItemItem };
