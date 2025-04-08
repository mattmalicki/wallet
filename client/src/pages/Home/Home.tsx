import { FC } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { Balance } from "../../components/Atoms/Balance/Balance";
import { TransactionList } from "../../components/Organisms/TransactionList/TransactionList";
import { AddTransactionButton } from "../../components/Atoms/AddTransactionButton/AddTransactionButton";

const Home: FC = () => {
  function handleAddButtonClick() {
    console.log("He he");
  }
  return (
    <Page>
      <Balance balance={20000} />
      <TransactionList
        id="56gf324gerew3r4w"
        date="12.12.12"
        type="+"
        category="Income"
        comment="Nothing to say"
        sum={203443}
      />
      <AddTransactionButton handleClick={handleAddButtonClick} />
    </Page>
  );
};

export { Home };
