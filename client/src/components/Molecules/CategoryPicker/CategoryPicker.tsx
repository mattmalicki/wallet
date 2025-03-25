import { FC, MouseEventHandler } from "react";
import styles from "./CategoryPicker.module.css";

const categoryArray: string[] = [
  "Main expenses",
  "Products",
  "Entertainment",
  "Other expenses",
  "Leisure",
  "Education",
  "Household products",
  "Child care",
  "Car",
];

interface CPProp {
  shouldRoll: boolean;
  clickHandler: MouseEventHandler<HTMLInputElement>;
}

const CategoryPicker: FC<CPProp> = (props) => {
  return (
    <div
      className={[
        styles.categoryContainer,
        props.shouldRoll ? styles.isVisible : "",
      ].join(" ")}
    >
      <ul className={styles.categoryPicker}>
        {categoryArray.map((category) => {
          const id = Math.random().toString();
          return (
            <li key={id} className={styles.listItem}>
              <input
                type="button"
                id={id}
                className={styles.item}
                onClick={props.clickHandler}
                value={category}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { CategoryPicker };
