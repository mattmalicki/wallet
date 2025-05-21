import { FC, MouseEventHandler, ReactNode } from "react";
import styles from "./TransactionItem.module.css";
import { TransactionItemItem } from "../../Molecules/TransactionItemItem/TransactionItemItem";
import { TransactionType } from "../../../redux/transactions/operations";
import { useCategories } from "../../../hooks/useCategories";

interface TransactionItemProp {
  transaction: TransactionType;
  editHandler: MouseEventHandler<HTMLButtonElement>;
  deleteHandler: MouseEventHandler<HTMLButtonElement>;
}

const TransactionItem: FC<TransactionItemProp> = (props) => {
  const { categories } = useCategories();

  function returnDdMmYy(date: Date): string {
    return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }

  function returnCategoriesTitles(
    parentId: string,
    childId: string
  ): { parent: string; child: string; borderColor: string } {
    const category = categories.find((item) => item._id === parentId);
    const childCategory = category?.childCategories.find(
      (item) => item._id === childId
    );

    return {
      parent: category!.title,
      child: childCategory!.title,
      borderColor: category!.color,
    };
  }

  function createItems(object: TransactionType): ReactNode {
    const listArray: ReactNode[] = [];
    const { parent, child, borderColor } = returnCategoriesTitles(
      object.categoryId!,
      object.childCategoryId!
    );
    listArray.push(
      <TransactionItemItem
        header={"Date"}
        value={returnDdMmYy(new Date(object.createdAt!))}
        borderColor={borderColor}
      />
    );
    listArray.push(
      <TransactionItemItem
        header={"Type"}
        value={object.type!}
        borderColor={borderColor}
      />
    );
    listArray.push(
      <TransactionItemItem
        header={"Category"}
        value={parent}
        borderColor={borderColor}
      />
    );
    listArray.push(
      <TransactionItemItem
        header={"Child category"}
        value={child}
        borderColor={borderColor}
      />
    );
    listArray.push(
      <TransactionItemItem
        header={"Comment"}
        value={object.comment!}
        borderColor={borderColor}
      />
    );
    listArray.push(
      <TransactionItemItem
        header={"Sum"}
        value={object.amount!}
        borderColor={borderColor}
      />
    );
    listArray.push(
      <TransactionItemItem
        id={object._id}
        deleteButtonHandler={props.deleteHandler}
        editButtonHandler={props.editHandler}
        borderColor={borderColor}
      />
    );
    return listArray;
  }
  return (
    <ul className={styles.transactionList} id={props.transaction._id}>
      {createItems(props.transaction)}
    </ul>
  );
};

export { TransactionItem };
