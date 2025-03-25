import { FC } from "react";
import styles from "./Header.module.css";
import { Logo } from "../../Atoms/Logo/Logo";
import { IconSvg } from "../../Atoms/Icon/Icon";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.user}>
        <span>User</span>
        <button className={styles.icon}>
          <IconSvg name="logout" />
        </button>
      </div>
    </header>
  );
};

export { Header };
