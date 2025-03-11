import { IconSvg, NameOpts } from "../Icon/Icon";
import styles from "./InputItem.module.css";
import React from "react";

type InputIdOpts = "email" | "password" | "firstName" | "lastName";

interface InputProps {
  name: InputIdOpts;
  placeholder?: string;
}

const InputItem: React.FC<InputProps> = (props) => {
  function getIconName() {
    let iconName = "";
    if (props.name === "email") iconName = "email";
    if (props.name === "password") iconName = "lock";
    if (props.name === "firstName") iconName = "name";
    if (props.name === "lastName") iconName = "name";
    return iconName;
  }
  return (
    <label htmlFor={props.name} className={styles.inputItem}>
      <div className={styles.icon}>
        <IconSvg name={getIconName() as NameOpts} />
      </div>
      <input
        name={props.name}
        id={props.name}
        type="text"
        className={styles.input}
        placeholder={
          props.placeholder ?? props.name[0].toUpperCase() + props.name.slice(1)
        }
      />
    </label>
  );
};

export { InputItem };
