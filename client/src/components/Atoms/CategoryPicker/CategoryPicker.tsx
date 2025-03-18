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
  className?: string;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const CategoryPicker: FC<CPProp> = (props) => {
  return (
    <ul className={[styles.categoryPicker, props.className].join(" ")}>
      {categoryArray.map((category) => {
        const id = Math.random().toString();
        return (
          <li key={id}>
            <button
              id={category}
              className={styles.item}
              onClick={props.clickHandler}
            >
              {category}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export { CategoryPicker };
