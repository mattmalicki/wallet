import { FC, MouseEvent, useEffect, useState } from "react";
import styles from "./InputCategory.module.css";
import { CategoryPicker } from "../CategoryPicker/CategoryPicker";
import {
  useChildCattegoryContext,
  useParentCattegoryContext,
  useTypeContext,
} from "../../../hooks/useTransactionsContexts";
import { useCategories } from "../../../hooks/useCategories";

interface ICProp {
  childId?: string;
}

const InputCategory: FC<ICProp> = (props) => {
  const [rollPicker, setRollPicker] = useState<boolean>(false);
  const { value: type } = useTypeContext();
  const { value: categoryId, setValue: setCategoryId } =
    useParentCattegoryContext();
  const { value: childCategoryId, setValue: setChildCategoryId } =
    useChildCattegoryContext();

  const { categoriesExpense, categoriesIncome } = useCategories();

  const [categoryValue, setCategoryValue] = useState<string>("");

  function categoryHandler(event: MouseEvent<HTMLInputElement>) {
    const ids = event.currentTarget.id.split(":");

    setCategoryValue(event.currentTarget.value);
    setCategoryId(ids[0]);
    setChildCategoryId(ids[1]);
    setRollPicker(false);
  }

  function focusHandler() {
    setRollPicker(true);
  }

  useEffect(() => {
    const categoryInput = document.getElementById(
      "category"
    ) as HTMLInputElement;
    if (categoryInput) setCategoryValue("");
  }, [type]);

  useEffect(() => {
    if (props.childId) {
      if (type === "income") {
        const parent = categoriesIncome.find((item) =>
          item.childCategories.find((item) => item._id === props.childId)
        );
        const childTitle = parent?.childCategories.find(
          (item) => item._id === props.childId
        )?.title;
        setCategoryValue(childTitle ?? "");
      } else {
        const parent = categoriesExpense.find((item) =>
          item.childCategories.find((item) => item._id === props.childId)
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
      />
      <CategoryPicker
        clickHandler={categoryHandler}
        shouldRoll={rollPicker}
        categories={type === "income" ? categoriesIncome : categoriesExpense}
      />
    </div>
  );
};

export { InputCategory };
