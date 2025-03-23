import React from "react";

import "./App.css";
import { StatisticsSummary } from "./components/Atoms/StatisticsSummary/StatisticsSummary";

const App: React.FC = () => {
  return (
    <div className="App">
      <StatisticsSummary incomeAmount={20000} expensesAmount={"12000"} />
    </div>
  );
};

export default App;
