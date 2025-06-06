import { FC, MouseEventHandler } from "react";
import styles from "./TransactionItemItem.module.css";
import { IconSvg } from "../../Atoms/Icon/Icon";

interface ValuesProp {
  header: string;
  value: string | number;
  incomeOrExpense?: "income" | "expense";
  borderColor: string;
}

interface ButtonProp {
  deleteButtonHandler: MouseEventHandler<HTMLButtonElement>;
  editButtonHandler: MouseEventHandler<HTMLButtonElement>;
  id?: string;
  borderColor: string;
}

type Never<T> = { [P in keyof T]?: never };
type OnlyValues = ValuesProp & Never<Omit<ButtonProp, "borderColor">>;
type OnlyButtons = ButtonProp & Never<Omit<ValuesProp, "borderColor">>;

const TransactionItemItem: FC<OnlyValues | OnlyButtons> = (props) => {
  return (
    <li
      className={styles.transactionListItem}
      style={{ borderColor: props.borderColor }}
    >
      {props.header && (
        <span className={styles.header}>
          {props.header[0].toUpperCase() + props.header.slice(1)}
        </span>
      )}
      {props.value && (
        <span
          className={[
            styles.value,
            props.incomeOrExpense ? styles[props.incomeOrExpense] : "",
          ].join(" ")}
        >
          {props.value || "-----"}
        </span>
      )}
      {props.deleteButtonHandler && (
        <div className={styles.buttons}>
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
              <span className={styles.editText}>Edit</span>
            </button>
          )}
        </div>
      )}
    </li>
  );
};

export { TransactionItemItem };
