import { FC } from "react";
import styles from "./Loader.module.css";

const Loader: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export { Loader };
