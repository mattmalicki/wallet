import { FC } from "react";
import styles from "./Balance.module.css";
import { getNumberFormat } from "../../../util/numberFormat";
import { useAuth } from "../../../hooks/useAuth";

const Balance: FC = () => {
  const { user } = useAuth();
  const classNames = `${styles.balanceContainer} ${
    user.balance > 0 ? styles.more : styles.less
  }`;
  return (
    <div className={classNames}>
      <p className={styles.tekst}>{"your balance"}</p>
      <p className={styles.balance}>{getNumberFormat(user.balance)}</p>
    </div>
  );
};

export { Balance };
