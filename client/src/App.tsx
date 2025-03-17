import React from "react";

import "./App.css";
import { TransactionInputItem } from "./components/Atoms/TransactionInputItem/TransactionInputItem";
import { DatePicker } from "./components/Atoms/DatePicker/DatePicker";

const App: React.FC = () => {
  return (
    <div className="App">
      <DatePicker />
      {/* <TransactionInputItem name="amount" />
      <TransactionInputItem name="date" />
      <TransactionInputItem name="comment" /> */}
    </div>
  );
};

export default App;
