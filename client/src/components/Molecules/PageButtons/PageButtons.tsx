import { FC } from "react";
import styles from "./PageButtons.module.css";
import { IconButton } from "../../Atoms/IconButton/IconButton";

const PageButtons: FC = () => {
  return (
    <div className={styles.pageButtons}>
      <IconButton name="home" isCurrent={true} />
      <IconButton name="statistics" />
      <IconButton name="currency" />
    </div>
  );
};

export { PageButtons };
