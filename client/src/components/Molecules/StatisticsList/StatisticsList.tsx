import { FC, ReactNode, useEffect, useState } from "react";
import styles from "./StatisticsList.module.css";
import { StatisticsListItem } from "../../Atoms/StatisticsListItem/StatisticsListItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTransactions } from "../../../hooks/useTransactions";
import { useCategories } from "../../../hooks/useCategories";
import { StatisticsListHeader } from "../../Atoms/StatisticsListHeader/StatisticsListHeader";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SLI {
  children?: ReactNode;
}

interface DoughnutData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
}

const StatisticsList: FC<SLI> = (props) => {
  const [dData, setDData] = useState<DoughnutData>({
    labels: ["Loading"],
    datasets: [
      {
        label: "Loading",
        data: [0],
        backgroundColor: ["blue"],
        borderWidth: 0,
      },
    ],
  });
  const { transactions } = useTransactions();
  const { categories } = useCategories();

  function setDoughnut() {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const data: number[] = [];

    categories.forEach((category) => {
      const root = document.documentElement;
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.categoryId === category._id
      );
      if (filteredTransactions.length > 0) {
        data.push(filteredTransactions.reduce((pV, cV) => pV + cV.amount, 0));
      } else {
        data.push(0);
      }
      labels.push(category.title);
      backgroundColor.push(
        getComputedStyle(root).getPropertyValue(
          `--${category.title.toLowerCase().split(" ").join("-")}-bg`
        )
      );
    });
    setDData({
      labels,
      datasets: [
        {
          label: "Summary",
          data,
          backgroundColor,
          borderWidth: 0,
        },
      ],
    });
  }

  useEffect(() => {
    setDoughnut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  return (
    <>
      <Doughnut
        options={{
          cutout: 100,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={dData}
      />
      {props.children}
      <StatisticsListHeader />
      {dData.labels.map((label, index) => {
        const key = Math.random();
        return (
          <StatisticsListItem
            key={key}
            categoryName={label}
            sum={dData.datasets[0].data[index]}
            color={dData.datasets[0].backgroundColor[index]}
          />
        );
      })}
    </>
  );
};

export { StatisticsList };
