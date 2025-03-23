import { FC } from "react";
import styles from "./StatisticsSummary.module.css";

interface SSProp {
  incomeAmount: string | number;
  expensesAmount: string | number;
}

const StatisticsSummary: FC<SSProp> = (props) => {
  return (
    <div className={styles.statisticsSummary}>
      <div className={styles.item}>
        <span>Expenses:</span>
        <span className={styles.expenses}>{props.expensesAmount}</span>
      </div>
      <div className={styles.item}>
        <span>Income:</span>
        <span className={styles.income}>{props.incomeAmount}</span>
      </div>
    </div>
  );
};

export { StatisticsSummary };
