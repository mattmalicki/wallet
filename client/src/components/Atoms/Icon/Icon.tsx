import Icon from "../../../images/icons-sprite.svg";
import React from "react";
import styles from "./Icon.module.css";

export type NameOpts =
  | "lock"
  | "logo"
  | "date"
  | "transaction"
  | "statistics"
  | "home"
  | "logout"
  | "email"
  | "name"
  | "eye"
  | "eye-blocked"
  | "arrow-down";

interface IconProp {
  name: NameOpts;
  width?: string;
  height?: string;
  color?: string;
}

const IconSvg: React.FC<IconProp> = (props) => {
  return (
    <svg
      className={styles.icon}
      stroke={props.color ?? "currentColor"}
      fill={props.color ?? "currentColor"}
      width={props.width ?? "100%"}
      height={props.height ?? "100%"}
    >
      <use href={`${Icon}#icon-${props.name}`} />
    </svg>
  );
};

export { IconSvg };
