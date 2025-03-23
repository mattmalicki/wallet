import React from "react";

import "./App.css";
import { CurrencyListItem } from "./components/Atoms/CurrencyListItem/CurrencyListItem";

const App: React.FC = () => {
  return (
    <div className="App">
      <CurrencyListItem purchase={200} currency="abs" sale={212} />
    </div>
  );
};

export default App;
