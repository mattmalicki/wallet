import React, { MouseEventHandler } from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

interface ButtonProp {
  title: string;
  colored: boolean;
  isSubmit?: boolean;
  isLinked?: boolean;
  link?: string;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProp> = (props) => {
  const classNames = `${styles.button} ${
    props.colored ? styles.colored : styles.transparent
  }`;
  return !props.isLinked ? (
    <button
      className={classNames}
      type={props.isSubmit ? "submit" : "button"}
      onClick={props.clickHandler}
    >
      {props.title}
    </button>
  ) : (
    <Link to={props.link ?? ""} className={classNames}>
      {props.title}
    </Link>
  );
};
export { Button };
