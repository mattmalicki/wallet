import { FC, MouseEventHandler, ReactNode } from "react";
import styles from "./TransactionList.module.css";
import { TransactionListItem } from "../../Molecules/TransactionListItem/TransactionListItem";

interface TransactionProp {
  id: string;
  date: string;
  type: "+" | "-";
  category: string;
  comment: string;
  sum: string | number;
  editHandler: MouseEventHandler<HTMLButtonElement>;
}

const TransactionList: FC<TransactionProp> = (props) => {
  function createItems(object: any): ReactNode {
    const listArray: ReactNode[] = [];
    for (const key in object) {
      if (key !== "id" && key !== "editHandler" && Object.hasOwn(object, key)) {
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
        editButtonHandler={props.editHandler}
      />
    );
    return listArray;
  }

  function onDeleteHandler() {
    console.log("Delete");
  }
  return (
    <ul className={styles.transactionList} data-id={props.id}>
      {createItems(props)}
    </ul>
  );
};

export { TransactionList };
