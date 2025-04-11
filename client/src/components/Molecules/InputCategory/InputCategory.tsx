import { FC, MouseEvent, useEffect, useState } from "react";
import styles from "./InputCategory.module.css";
import { CategoryPicker } from "../CategoryPicker/CategoryPicker";
import { useCategories } from "../../../hooks/useCategories";

const InputCategory: FC = () => {
  const [rollPicker, setRollPicker] = useState<boolean>(false);

  const { categories } = useCategories();

  const [categoryValue, setCategoryValue] = useState<string>("");

  function categoryHandler(event: MouseEvent<HTMLInputElement>) {
    console.log(event.currentTarget.dataset.titles);
    setCategoryValue(event.currentTarget.value);
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
        required
      />
      <CategoryPicker clickHandler={categoryHandler} shouldRoll={rollPicker} />
    </div>
  );
};

export { InputCategory };
