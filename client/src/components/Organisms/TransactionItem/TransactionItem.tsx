import { FC, MouseEventHandler, ReactNode } from "react";
import styles from "./TransactionItem.module.css";
import { TransactionItemItem } from "../../Molecules/TransactionItemItem/TransactionItemItem";
import { TransactionType } from "../../../redux/transactions/operations";

interface TransactionItemProp {
  transaction: TransactionType;
  editHandler: MouseEventHandler<HTMLButtonElement>;
}

const TransactionItem: FC<TransactionItemProp> = (props) => {
  function createItems(object: any): ReactNode {
    const listArray: ReactNode[] = [];
    for (const key in object) {
      if (key !== "_id" && key !== "userId" && Object.hasOwn(object, key)) {
        const element = object[key];
        listArray.push(
          <TransactionItemItem
            key={Math.random().toString()}
            header={key}
            value={element}
          />
        );
      }
    }
    listArray.push(
      <TransactionItemItem
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
    <ul className={styles.transactionList} data-id={props.transaction._id}>
      {createItems(props.transaction)}
    </ul>
  );
};

export { TransactionItem };
