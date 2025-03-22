import { FC } from "react";
import styles from "./StatisticsListItem.module.css";

interface SLIProp {
  categoryName: string;
  sum: string | number;
  color: string;
}

const StatisticsListItem: FC<SLIProp> = (props) => {
  return (
    <li className={styles.statisticsListItem}>
      <div
        className={styles.colorIcon}
        style={{ backgroundColor: `${props.color}` }}
      ></div>
      <span>{props.categoryName}</span>
      <span>{props.sum}</span>
    </li>
  );
};

export { StatisticsListItem };
