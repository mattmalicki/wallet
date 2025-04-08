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
      <ul className={styles.categoryPicker}>
        {categories.map((category) => {
          return (
            <li key={category.id} className={styles.listItem}>
              <span className={styles.categoryTitle}>{category.title}</span>
              <ul>
                {category.childCategories.map((childCategory) => {
                  return (
                    <li key={childCategory.id}>
                      <input
                        type="button"
                        id={category.id + ":" + childCategory.id}
                        className={styles.item}
                        onClick={props.clickHandler}
                        value={childCategory.title}
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
