import { FC, MouseEventHandler, ReactNode } from "react";
import styles from "./TransactionItem.module.css";
import { TransactionItemItem } from "../../Molecules/TransactionItemItem/TransactionItemItem";
import { TransactionType } from "../../../redux/transactions/operations";
import { useCategories } from "../../../hooks/useCategories";

interface TransactionItemProp {
  transaction: TransactionType;
  editHandler: MouseEventHandler<HTMLButtonElement>;
}

const TransactionItem: FC<TransactionItemProp> = (props) => {
  const { categories } = useCategories();

  function returnDdMmYy(date: Date): string {
    return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }

  function returnCategoriesTitles(
    parentId: string,
    childId: string
  ): { parent: string; child: string } {
    const category = categories.find((item) => item._id === parentId);
    const childCategory = category?.childCategories.find(
      (item) => item._id === childId
    );

    return { parent: category!.title, child: childCategory!.title };
  }

  function createItems(object: TransactionType): ReactNode {
    const listArray: ReactNode[] = [];
    listArray.push(
      <TransactionItemItem
        header={"Date"}
        value={returnDdMmYy(new Date(object.createdAt!))}
      />
    );
    listArray.push(
      <TransactionItemItem header={"Type"} value={object.type!} />
    );
    const { parent, child } = returnCategoriesTitles(
      object.categoryId!,
      object.childCategoryId!
    );
    listArray.push(<TransactionItemItem header={"Category"} value={parent} />);
    listArray.push(
      <TransactionItemItem header={"Child category"} value={child} />
    );
    listArray.push(
      <TransactionItemItem header={"Comment"} value={object.comment!} />
    );
    listArray.push(
      <TransactionItemItem header={"Sum"} value={object.amount!} />
    );
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
    <ul className={styles.transactionList} id={props.transaction._id}>
      {createItems(props.transaction)}
    </ul>
  );
};

export { TransactionItem };
