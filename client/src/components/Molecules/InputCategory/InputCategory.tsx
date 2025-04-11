import { FC, MouseEvent, useState } from "react";
import styles from "./InputCategory.module.css";
import { CategoryPicker } from "../CategoryPicker/CategoryPicker";

const InputCategory: FC = () => {
  const [rollPicker, setRollPicker] = useState<boolean>(false);

  const [categoryValue, setCategoryValue] = useState<string>("");

  function categoryHandler(event: MouseEvent<HTMLInputElement>) {
    setCategoryValue(event.currentTarget.id);
    setRollPicker(false);
  }

  function focusHandler() {
    setRollPicker(true);
  }
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
