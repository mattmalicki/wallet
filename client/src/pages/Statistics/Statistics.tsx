import { FC, MouseEvent, useEffect, useState } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { ButtonStatistics } from "../../components/Molecules/ButtonStatistics/ButtonStatistics";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchTransactionsWithQuery } from "../../redux/transactions/operations";
import { MonthsAndYears } from "../../hooks/useDate";
import { StatisticsList } from "../../components/Molecules/StatisticsList/StatisticsList";

const Statistics: FC = () => {
  const dispatch = useAppDispatch();
  const [monthIndex, setMonthIndex] = useState<string>();
  const [month, setMonth] = useState<string>(new Date().getMonth().toString());
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());

  function handleMonth(event: MouseEvent<HTMLButtonElement>) {
    setMonth(event.currentTarget.id);
    setMonthIndex(event.currentTarget.getAttribute("data-index")!);
  }
  function handleYear(event: MouseEvent<HTMLButtonElement>) {
    setYear(event.currentTarget.id);
  }

  useEffect(() => {
    const newDate = new Date();
    const months = new MonthsAndYears().getOnlyMonths();
    setMonth(months[newDate.getMonth()]);
    setMonthIndex(newDate.getMonth().toString());

    setYear(newDate.getFullYear().toString());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!monthIndex || !year) {
      return;
    }
    dispatch(
      fetchTransactionsWithQuery({
        month: Number(monthIndex) + 1,
        year: Number(year),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthIndex, year]);

  return (
    <Page>
      <StatisticsList>
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
      </StatisticsList>
    </Page>
  );
};

export { Statistics };
