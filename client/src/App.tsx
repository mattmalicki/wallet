import React from "react";

import "./App.css";
import { TransactionInputItem } from "./components/Atoms/TransactionInputItem/TransactionInputItem";

const App: React.FC = () => {
  return (
    <div className="App">
      <TransactionInputItem name="category" />
    </div>
  );
};

export default App;
