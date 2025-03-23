import { FC } from "react";
import styles from "./StatisticsListHeader.module.css";

const StatisticsListHeader: FC = () => {
  return (
    <div className={styles.statisticsListHeader}>
      <span>Category</span>
      <span>Sum</span>
    </div>
  );
};

export { StatisticsListHeader };
