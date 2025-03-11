import React from "react";
import styles from "./Button.module.css";

interface ButtonProp {
  title: string;
  colored: boolean;
}

const Button: React.FC<ButtonProp> = (props) => {
  const classNames = `${styles.button} ${
    props.colored ? styles.colored : styles.transparent
  }`;
  return <button className={classNames}>{props.title}</button>;
};
export { Button };
