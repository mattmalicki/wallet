import { FC } from "react";
import styles from "./Balance.module.css";
import { getNumberFormat } from "../../../util/numberFormat";

interface BalanceProp {
  balance: number;
}

const Balance: FC<BalanceProp> = (props) => {
  const classNames = `${styles.balanceContainer} ${
    props.balance > 0 ? styles.more : styles.less
  }`;
  return (
    <div className={classNames}>
      <p className={styles.tekst}>{"your balance"}</p>
      <p className={styles.balance}>{getNumberFormat(props.balance)}</p>
    </div>
  );
};

export { Balance };
