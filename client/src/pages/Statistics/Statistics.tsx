import { FC } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { ButtonStatistics } from "../../components/Molecules/ButtonStatistics/ButtonStatistics";
import { StatisticsListHeader } from "../../components/Atoms/StatisticsListHeader/StatisticsListHeader";
import { StatisticsListItem } from "../../components/Atoms/StatisticsListItem/StatisticsListItem";

const Statistics: FC = () => {
  return (
    <Page>
      <ButtonStatistics type="month" clickHandler={() => {}} />
      <ButtonStatistics type="year" clickHandler={() => {}} />
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
