import { FC, MouseEvent, useEffect, useState } from "react";
import styles from "./InputCategory.module.css";
import { CategoryPicker } from "../CategoryPicker/CategoryPicker";
import { useCategories } from "../../../hooks/useCategories";

const InputCategory: FC = () => {
  const [rollPicker, setRollPicker] = useState<boolean>(false);

  const { categories } = useCategories();

  const [categoryValue, setCategoryValue] = useState<string>("");
  const [categoriesIds, setCategoriesIds] = useState<string>("");

  function categoryHandler(event: MouseEvent<HTMLInputElement>) {
    const ids = event.currentTarget.id.split(":");

    setCategoryValue(event.currentTarget.value);
    setCategoriesIds(ids.join(":"));
    setRollPicker(false);
  }

  function focusHandler() {
    setRollPicker(true);
  }

  useEffect(() => {
    const categoryInput = document.getElementById(
      "category"
    ) as HTMLInputElement;
    if (categoryInput) categoryInput.value = "";
  }, [categories]);

  return (
    <div className={styles.inputCategory}>
      <input
        id={"category"}
        value={categoryValue}
        onFocus={focusHandler}
        readOnly
        placeholder="Select a category"
        data-categories={categoriesIds}
        required
      />
      <CategoryPicker clickHandler={categoryHandler} shouldRoll={rollPicker} />
    </div>
  );
};

export { InputCategory };
