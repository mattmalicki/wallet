import { FC } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { useTransactions } from "../../hooks/useTransactions";
import { StatisticsList } from "../../components/Molecules/StatisticsList/StatisticsList";

const DetailedStatistics: FC = () => {
  const { transactions } = useTransactions();

  return !transactions ? (
    <div>loading...</div>
  ) : (
    <Page>
      <StatisticsList />
    </Page>
  );
};

export { DetailedStatistics };
