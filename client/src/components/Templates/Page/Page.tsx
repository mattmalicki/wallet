import { FC, ReactNode } from "react";
import styles from "./Page.module.css";
import { PageButtons } from "../../Molecules/PageButtons/PageButtons";
import { useAuth } from "../../../hooks/useAuth";

interface PageProp {
  children: ReactNode;
}

const Page: FC<PageProp> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return (
    <section className={styles.pageContainer}>
      {isLoggedIn && <PageButtons />}
      {children}
    </section>
  );
};

export { Page };
