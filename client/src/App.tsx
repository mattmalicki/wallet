import React from "react";

import "./App.css";
import { Balance } from "./components/Atoms/Balance/Balance";

const App: React.FC = () => {
  return (
    <div className="App">
      <Balance balance={122323411} />
    </div>
  );
};

export default App;
