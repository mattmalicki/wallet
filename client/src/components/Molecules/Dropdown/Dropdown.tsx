import { FC, MouseEventHandler } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProp {
  currentValue?: string;
  shouldRoll: boolean;
  array: string[] | number[];
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const Dropdown: FC<DropdownProp> = (props) => {
  return (
    <div
      className={[
        styles.dropdown,
        props.shouldRoll ? styles.isVisible : "",
      ].join(" ")}
    >
      {props.array.map((item) => {
        const id = Math.random().toString();
        return (
          <button
            key={id}
            id={item.toString()}
            type="button"
            onClick={props.clickHandler}
            className={[
              styles.dropdownItem,
              props.currentValue === item ? styles.blink : "",
            ].join(" ")}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export { Dropdown };
