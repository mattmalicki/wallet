import { IconSvg, NameOpts } from "../Icon/Icon";
import styles from "./AuthInputItem.module.css";
import React, { useEffect, useState } from "react";

type AuthInputIdOpts =
  | "email"
  | "password"
  | "firstName"
  | "lastName"
  | "confirmPassword";

interface AuthInputProps {
  name: AuthInputIdOpts;
  placeholder?: string;
}

const AuthInputItem: React.FC<AuthInputProps> = (props) => {
  const [hidden, setHidden] = useState(false);
  const type = props.name === "email" ? "email" : "text";

  useEffect(() => {
    if (props.name === "password") setHidden(true);
  }, [props.name]);

  function getIconName() {
    let iconName = "";
    if (props.name === "email") iconName = "email";
    if (props.name === "password") iconName = "lock";
    if (props.name === "confirmPassword") iconName = "lock";
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
        type={hidden ? "password" : type}
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

export { AuthInputItem };
