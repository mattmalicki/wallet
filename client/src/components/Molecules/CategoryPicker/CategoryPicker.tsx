import { FC, MouseEventHandler } from "react";
import styles from "./CategoryPicker.module.css";
import { useCategories } from "../../../hooks/useCategories";

interface CPProp {
  shouldRoll: boolean;
  clickHandler: MouseEventHandler<HTMLInputElement>;
}

const CategoryPicker: FC<CPProp> = (props) => {
  const { categories } = useCategories();

  return (
    <div
      className={[
        styles.categoryContainer,
        props.shouldRoll ? styles.isVisible : "",
      ].join(" ")}
    >
      <ul className={styles.categoryPicker} data-category-picker>
        {categories.map((category) => {
          return (
            <li
              key={category._id}
              className={styles.listItem}
              data-category-picker
            >
              <span className={styles.categoryTitle} data-category-picker>
                {category.title}
              </span>
              <ul data-category-picker>
                {category.childCategories.map((childCategory) => {
                  return (
                    <li key={childCategory._id} data-category-picker>
                      <input
                        type="button"
                        id={category._id + ":" + childCategory._id}
                        className={styles.item}
                        onClick={props.clickHandler}
                        value={childCategory.title}
                        data-titles={category.title + ":" + childCategory.title}
                        data-category-picker
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
