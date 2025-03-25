import { FC, ReactNode } from "react";
import styles from "./Page.module.css";

interface PageProp {
  children: ReactNode;
}

const Page: FC<PageProp> = ({ children }) => {
  return <section className={styles.pageContainer}>{children}</section>;
};

export { Page };
