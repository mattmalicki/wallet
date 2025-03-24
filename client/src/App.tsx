import React, { MouseEvent } from "react";

import "./App.css";
import { TransactionListItem } from "./components/Molecules/TransactionListItem/TransactionListItem";

const App: React.FC = () => {
  function something(event: MouseEvent<HTMLButtonElement>) {
    console.log("fwvjrnn");
  }
  return (
    <div className="App">
      <TransactionListItem
        deleteButtonHandler={something}
        editButtonHandler={something}
      />
    </div>
  );
};

export default App;
