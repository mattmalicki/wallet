import React from "react";
import { IconSvg } from "../Icon/Icon";
import styles from "./Logo.module.css";

type sizeOpt = "small" | "medium" | "large";

interface LogoProps {
  size: sizeOpt;
}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <div className={styles.logo}>
      <div className={styles[props.size]}>
        <IconSvg name="logo" />
      </div>
      <span className={styles.logoName}>Wallet</span>
    </div>
  );
};

export { Logo };
