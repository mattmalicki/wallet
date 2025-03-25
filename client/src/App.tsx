import React from "react";

import "./App.css";
import { Currencies } from "./components/Organisms/Currencies/Currencies";

const App: React.FC = () => {
  return (
    <div className="App">
      <Currencies />
    </div>
  );
};

export default App;
