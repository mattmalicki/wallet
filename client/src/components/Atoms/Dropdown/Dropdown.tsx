import { FC, MouseEventHandler } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProp {
  shouldRoll: boolean;
  array: string[];
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const Dropdown: FC<DropdownProp> = (props) => {
  return (
    <div
      className={[styles.dropdown, props.shouldRoll && styles.isVisible].join(
        " "
      )}
    >
      {props.array.map((item) => {
        const id = Math.random().toString();
        return (
          <button
            key={id}
            type="button"
            onClick={props.clickHandler}
            className={styles.dropdownItem}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export { Dropdown };
