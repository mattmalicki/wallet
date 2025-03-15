import { IconSvg, NameOpts } from "../Icon/Icon";
import styles from "./InputItem.module.css";
import React, { useEffect, useState } from "react";

type InputIdOpts = "email" | "password" | "firstName" | "lastName";

interface InputProps {
  name: InputIdOpts;
  placeholder?: string;
}

const InputItem: React.FC<InputProps> = (props) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (props.name === "password") setHidden(true);
  }, [props.name]);

  function getIconName() {
    let iconName = "";
    if (props.name === "email") iconName = "email";
    if (props.name === "password") iconName = "lock";
    if (props.name === "firstName") iconName = "name";
    if (props.name === "lastName") iconName = "name";
    return iconName;
  }
  function toggleIcon() {
    setHidden((currentState) => !currentState);
  }
  return (
    <label htmlFor={props.name} className={styles.inputItem}>
      <div className={styles.icon}>
        <IconSvg name={getIconName() as NameOpts} />
      </div>
      <input
        name={props.name}
        id={props.name}
        type={hidden ? "password" : "text"}
        className={styles.input}
        placeholder={
          props.placeholder ?? props.name[0].toUpperCase() + props.name.slice(1)
        }
      />
      {props.name === "password" && (
        <button type="button" className={styles.eye} onClick={toggleIcon}>
          <IconSvg name={hidden ? "eye-blocked" : "eye"} />
        </button>
      )}
    </label>
  );
};

export { InputItem };
