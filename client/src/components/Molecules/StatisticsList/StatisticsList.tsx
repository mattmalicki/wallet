import { FC, MouseEvent, ReactNode, useEffect, useState } from "react";
import styles from "./StatisticsList.module.css";
import { StatisticsListItem } from "../../Atoms/StatisticsListItem/StatisticsListItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTransactions } from "../../../hooks/useTransactions";
import { useCategories } from "../../../hooks/useCategories";
import { StatisticsListHeader } from "../../Atoms/StatisticsListHeader/StatisticsListHeader";
import { useNavigate, useParams } from "react-router-dom";
import { Category, ChildCategory } from "../../../redux/categories/slice";

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
  const { id: categoryTitle } = useParams();
  const navigate = useNavigate();
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

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (categoryTitle) return;
    navigate(`/statistics/${event.currentTarget.id}`);
  }

  function hexToRgb(hex: string) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function mapCategories(
    array: ChildCategory[] | Category[],
    isChild?: boolean
  ) {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const data: number[] = [];

    array.forEach((category, index) => {
      const root = document.documentElement;
      let filteredTransactions = [];
      if (isChild) {
        filteredTransactions = transactions.filter(
          (transaction) => transaction.childCategoryId === category._id
        );
      } else {
        filteredTransactions = transactions.filter(
          (transaction) => transaction.categoryId === category._id
        );
      }
      if (filteredTransactions.length > 0) {
        data.push(filteredTransactions.reduce((pV, cV) => pV + cV.amount, 0));
      } else {
        data.push(0);
      }
      labels.push(category.title);
      if (isChild) {
        const hex = getComputedStyle(root).getPropertyValue(
          `--${categoryTitle!.toLowerCase().split(" ").join("-")}-bg`
        );
        const rgb = hexToRgb(hex);
        backgroundColor.push(
          `rgba(${rgb?.r}, ${rgb?.g}, ${rgb?.b}, 0.${index + 1})`
        );
      } else {
        backgroundColor.push(
          getComputedStyle(root).getPropertyValue(
            `--${category.title.toLowerCase().split(" ").join("-")}-bg`
          )
        );
      }
    });
    return {
      labels,
      datasets: [
        {
          label: "Summary",
          data,
          backgroundColor,
          borderWidth: 0,
        },
      ],
    };
  }

  function setDoughnut(categoryTitle?: string) {
    if (categoryTitle) {
      setDData(
        mapCategories(
          categories.find(
            (category) => category.title === categoryTitle.split("-").join(" ")
          )!.childCategories,
          true
        )
      );
    } else {
      setDData(mapCategories(categories));
    }
  }

  useEffect(() => {
    if (categoryTitle) {
      setDoughnut(categoryTitle);
    } else {
      setDoughnut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions, categoryTitle]);

  return transactions.length > 0 ? (
    <>
      <Doughnut
        options={{
          cutout: "50%",
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
          <button
            key={key}
            id={label.split(" ").join("-")}
            type="button"
            className={styles.button}
            onClick={handleClick}
          >
            <StatisticsListItem
              categoryName={label}
              sum={dData.datasets[0].data[index]}
              color={dData.datasets[0].backgroundColor[index]}
            />
          </button>
        );
      })}
    </>
  ) : (
    <>
      <span>No data found for this month</span>
      {props.children}
    </>
  );
};

export { StatisticsList };
