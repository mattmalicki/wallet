import { FC, useEffect } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { Currencies } from "../../components/Organisms/Currencies/Currencies";
import { Notify } from "notiflix";

const Currency: FC = () => {
  useEffect(() => {
    Notify.info("Sorry but this page is still in progress.", {
      position: "left-top",
      timeout: 5000,
    });
  }, []);
  return (
    <Page>
      <Currencies />
    </Page>
  );
};

export { Currency };
