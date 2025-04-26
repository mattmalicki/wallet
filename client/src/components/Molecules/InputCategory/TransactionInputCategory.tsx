import { FC, MouseEvent, useEffect, useState } from "react";
import styles from "./TransactionInputCategory.module.css";
import { CategoryPicker } from "../CategoryPicker/CategoryPicker";
import { useCategories } from "../../../hooks/useCategories";

interface TICProp {
  type: string;
  parentId?: string;
  childId?: string;
}

const TransactionInputCategory: FC<TICProp> = (props) => {
  const [rollPicker, setRollPicker] = useState<boolean>(false);
  const { categoriesExpense, categoriesIncome } = useCategories();

  const [categoryValue, setCategoryValue] = useState<string>("");

  function categoryHandler(event: MouseEvent<HTMLInputElement>) {
    const ids = event.currentTarget.id.split(":");

    setCategoryValue(event.currentTarget.value);
    setIds(ids[0] ?? "", ids[1] ?? "");
    setRollPicker(false);
  }

  function focusHandler() {
    setRollPicker(true);
  }

  function setIds(parentId: string, childId: string) {
    if (!parentId || !childId) {
      return;
    }
    const categoryElement = document.getElementById("category");
    categoryElement?.setAttribute(
      "data-categories-ids",
      `${parentId}:${childId}`
    );
  }

  useEffect(() => {
    const categoryInput = document.getElementById(
      "category"
    ) as HTMLInputElement;
    if (categoryInput) setCategoryValue("");
  }, [props.type]);

  useEffect(() => {
    if (props.childId) {
      if (props.type === "income") {
        const parent = categoriesIncome.find(
          (item) => item._id === props.parentId
        );
        const child = parent?.childCategories.find(
          (item) => item._id === props.childId
        );
        setCategoryValue(child?.title ?? "");
      } else {
        const parent = categoriesExpense.find(
          (item) => item._id === props.childId
        );
        const childTitle = parent?.childCategories.find(
          (item) => item._id === props.childId
        )?.title;
        setCategoryValue(childTitle ?? "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.childId]);

  return (
    <div className={styles.inputCategory}>
      <input
        id={"category"}
        value={categoryValue}
        onFocus={focusHandler}
        readOnly
        placeholder="Select a category"
        required
        data-categories-ids={`${props.parentId}:${props.childId}`}
      />
      <CategoryPicker
        clickHandler={categoryHandler}
        shouldRoll={rollPicker}
        categories={
          props.type === "income" ? categoriesIncome : categoriesExpense
        }
      />
    </div>
  );
};

export { TransactionInputCategory };
