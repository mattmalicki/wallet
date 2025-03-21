import React from "react";

import "./App.css";
import { ButtonStatistics } from "./components/Atoms/ButtonStatistics/ButtonStatistics";

const App: React.FC = () => {
  return (
    <div className="App">
      <ButtonStatistics
        type="month"
        clickHandler={() => console.log("Testing")}
      />
    </div>
  );
};

export default App;
