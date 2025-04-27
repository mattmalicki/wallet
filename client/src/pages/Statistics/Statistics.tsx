import { FC } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { ButtonStatistics } from "../../components/Molecules/ButtonStatistics/ButtonStatistics";
import { StatisticsListHeader } from "../../components/Atoms/StatisticsListHeader/StatisticsListHeader";
import { StatisticsListItem } from "../../components/Atoms/StatisticsListItem/StatisticsListItem";
import { useTransactions } from "../../hooks/useTransactions";

const Statistics: FC = () => {
  const { transactions } = useTransactions();

  return transactions ? (
    <div>loading...</div>
  ) : (
    <Page>
      <ButtonStatistics type="month" />
      <ButtonStatistics type="year" />
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
