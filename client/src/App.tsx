import React from "react";

import "./App.css";
import { TransactionSwitch } from "./components/Atoms/TransactionSwitch/TransactionSwitch";

const App: React.FC = () => {
  return (
    <div className="App">
      <TransactionSwitch actionType="add" />
    </div>
  );
};

export default App;
