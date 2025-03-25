import { FC } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { Currencies } from "../../components/Organisms/Currencies/Currencies";

const Currency: FC = () => {
  return (
    <Page>
      <Currencies />
    </Page>
  );
};

export { Currency };
