import { FC, MouseEvent, useEffect, useState } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { ButtonStatistics } from "../../components/Molecules/ButtonStatistics/ButtonStatistics";
import { StatisticsListHeader } from "../../components/Atoms/StatisticsListHeader/StatisticsListHeader";
import { StatisticsListItem } from "../../components/Atoms/StatisticsListItem/StatisticsListItem";
import { useTransactions } from "../../hooks/useTransactions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchTransactionsWithQuery } from "../../redux/transactions/operations";
import { MonthsAndYears } from "../../hooks/useDate";

const Statistics: FC = () => {
  const dispatch = useAppDispatch();
  const [monthIndex, setMonthIndex] = useState<string>();
  const [month, setMonth] = useState<string>(new Date().getMonth().toString());
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());

  const { transactions } = useTransactions();

  function handleMonth(event: MouseEvent<HTMLButtonElement>) {
    setMonth(event.currentTarget.id);
    setMonthIndex(event.currentTarget.getAttribute("data-index")!);
  }
  function handleYear(event: MouseEvent<HTMLButtonElement>) {
    setYear(event.currentTarget.id);
  }

  useEffect(() => {
    dispatch(
      fetchTransactionsWithQuery({
        month: Number(monthIndex) + 1,
        year: Number(year),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthIndex, year]);

  useEffect(() => {
    const newDate = new Date();
    const months = new MonthsAndYears().getOnlyMonths();
    setMonth(months[newDate.getMonth()]);
    setMonthIndex(newDate.getMonth().toString());

    setYear(newDate.getFullYear().toString());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !transactions ? (
    <div>loading...</div>
  ) : (
    <Page>
      <ButtonStatistics
        type="month"
        handleClick={handleMonth}
        currentValue={month}
      />
      <ButtonStatistics
        type="year"
        handleClick={handleYear}
        currentValue={year}
      />
      <StatisticsListHeader />
      <StatisticsListItem
        categoryName="main expenses"
        sum={232453432}
        color="yellow"
      />
    </Page>
  );
};

export { Statistics };
