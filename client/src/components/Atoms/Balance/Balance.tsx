import { FC } from "react";
import styles from "./Balance.module.css";

interface BalanceProp {
  balance: string | number;
}

const Balance: FC<BalanceProp> = (props) => {
  return (
    <div className={styles.balanceContainer}>
      <p className={styles.tekst}>{"your balance"}</p>
      <p className={styles.balance}>{props.balance}</p>
    </div>
  );
};

export { Balance };
