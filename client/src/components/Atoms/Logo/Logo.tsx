import { FC } from "react";
import { IconSvg } from "../Icon/Icon";
import styles from "./Logo.module.css";

const Logo: FC = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.icon}>
        <IconSvg name="logo" />
      </div>
      <span className={styles.logoName}>Wallet</span>
    </div>
  );
};

export { Logo };
