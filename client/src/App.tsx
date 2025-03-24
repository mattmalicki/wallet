import React from "react";

import "./App.css";
import { Transaction } from "./components/Organisms/Transaction/Transaction";

const App: React.FC = () => {
  return (
    <div className="App">
      <Transaction
        id="dsffs"
        date="12.12.12"
        type="+"
        category="dasd"
        comment="sdadas"
        sum={24323}
      />
    </div>
  );
};

export default App;
