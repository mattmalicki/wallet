import React from "react";
import { IconSvg } from "../Icon/Icon";
import styles from "./IconButton.module.css";

const IconButton: React.FC = (props) => {
  const classNames = `${styles.iconButton} ${styles.current}`;
  return (
    <div className={classNames}>
      <IconSvg name="home" />
    </div>
  );
};

export { IconButton };
