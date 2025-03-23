import React from "react";

import "./App.css";
import { CurrencyHeader } from "./components/Atoms/CurrencyHeader/CurrencyHeader";

const App: React.FC = () => {
  return (
    <div className="App">
      <CurrencyHeader />
    </div>
  );
};

export default App;
