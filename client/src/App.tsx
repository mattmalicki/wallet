import React from "react";

import "./App.css";
import { StatisticsListItem } from "./components/Atoms/StatisticsListItem/StatisticsListItem";

const App: React.FC = () => {
  return (
    <div className="App">
      <ul style={{ width: "100%" }}>
        <StatisticsListItem
          categoryName="Main Expenses"
          sum={20000}
          color="blue"
        />
      </ul>
    </div>
  );
};

export default App;
