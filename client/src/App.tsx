import React from "react";

import "./App.css";
import { TransactionFrom } from "./components/Organisms/TransactionFrom/TransactionFrom";

const App: React.FC = () => {
  return (
    <div className="App">
      <TransactionFrom />
    </div>
  );
};

export default App;
