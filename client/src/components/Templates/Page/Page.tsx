import { FC, ReactNode } from "react";
import styles from "./Page.module.css";
import { PageButtons } from "../../Molecules/PageButtons/PageButtons";
import { useAuth } from "../../../hooks/useAuth";
import { useCategories } from "../../../hooks/useCategories";
import { useTransactions } from "../../../hooks/useTransactions";
import { Loader } from "../../Atoms/Loader/Loader";

interface PageProp {
  class?: string;
  children: ReactNode;
}

const Page: FC<PageProp> = (props) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const { categoriesRefresh } = useCategories();
  const { transactionsRefresh } = useTransactions();
  return (
    <section className={[styles.pageContainer, props.class].join(" ")}>
      {isLoggedIn && <PageButtons />}
      {!transactionsRefresh && !categoriesRefresh && !isRefreshing ? (
        props.children
      ) : (
        <Loader />
      )}
    </section>
  );
};

export { Page };
