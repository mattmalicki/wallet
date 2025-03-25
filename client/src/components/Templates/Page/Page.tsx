import { FC, ReactNode } from "react";
import styles from "./Page.module.css";
import { PageButtons } from "../../Molecules/PageButtons/PageButtons";

interface PageProp {
  children: ReactNode;
}

const Page: FC<PageProp> = ({ children }) => {
  return (
    <section className={styles.pageContainer}>
      <PageButtons />
      {children}
    </section>
  );
};

export { Page };
