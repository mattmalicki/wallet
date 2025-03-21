import { FC, ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProp {
  children: ReactNode;
}

const Modal: FC<ModalProp> = (props) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>{props.children}</div>
    </div>
  );
};

export { Modal };
