import { FC, MouseEvent, useState } from "react";
import styles from "./InputCategory.module.css";
import { CategoryPicker } from "../CategoryPicker/CategoryPicker";

const InputCategory: FC = () => {
  const [rollPicker, setRollPicker] = useState<boolean>(false);

  const [categoryValue, setCategoryValue] =
    useState<string>("Select a category");

  function categoryHandler(event: MouseEvent<HTMLInputElement>) {
    setCategoryValue(event.currentTarget.value);
    setRollPicker(false);
  }

  function focusHandler() {
    setRollPicker(true);
  }
  return (
    <div className={styles.inputCategory}>
      <input id={"category"} value={categoryValue} onFocus={focusHandler} />
      {rollPicker && <CategoryPicker clickHandler={categoryHandler} />}
    </div>
  );
};

export { InputCategory };
