import { FC } from "react";
import styles from "./ImageAuth.module.css";
import { IconSvg } from "../Icon/Icon";

const ImageAuth: FC = () => {
  return (
    <div className={styles.imageAuthContainer}>
      <div className={styles.image}>
        <IconSvg name="image-auth" stroke="" />
      </div>
      <p className={styles.title}>Finance App</p>
    </div>
  );
};

export { ImageAuth };
