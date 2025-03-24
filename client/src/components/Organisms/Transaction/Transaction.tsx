import { FC, ReactNode } from "react";
import styles from "./Transaction.module.css";
import { TransactionListItem } from "../../Molecules/TransactionListItem/TransactionListItem";

interface TransactionProp {
  id: string;
  date: string;
  type: "+" | "-";
  category: string;
  comment: string;
  sum: string | number;
}

const Transaction: FC<TransactionProp> = (props) => {
  function createItems(object: any): ReactNode {
    const listArray: ReactNode[] = [];
    for (const key in object) {
      if (key !== "id" && Object.hasOwn(object, key)) {
        const element = object[key];
        listArray.push(
          <TransactionListItem
            key={Math.random().toString()}
            header={key}
            value={element}
          />
        );
      }
    }
    listArray.push(
      <TransactionListItem
        deleteButtonHandler={onDeleteHandler}
        editButtonHandler={onEditHandler}
      />
    );
    return listArray;
  }

  function onDeleteHandler() {
    console.log("Delete");
  }

  function onEditHandler() {
    console.log("Edit");
  }

  return (
    <ul className={styles.transaction} data-id={props.id}>
      {createItems(props)}
    </ul>
  );
};

export { Transaction };
