import { FC, MouseEventHandler } from "react";
import styles from "./CategoryPicker.module.css";
import { Category } from "../../../redux/categories/slice";

interface CPProp {
  shouldRoll: boolean;
  categories: Category[];
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
        {props.categories.map((category) => {
          return (
            <li key={category._id} className={styles.listItem}>
              <span className={styles.categoryTitle}>{category.title}</span>
              <ul>
                {category.childCategories.map((childCategory) => {
                  return (
                    <li key={childCategory._id}>
                      <input
                        type="button"
                        id={category._id + ":" + childCategory._id}
                        className={styles.item}
                        onClick={props.clickHandler}
                        value={childCategory.title}
                        data-titles={category.title + ":" + childCategory.title}
                      />
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { CategoryPicker };
