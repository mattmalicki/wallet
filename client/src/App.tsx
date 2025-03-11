import React from "react";

import "./App.css";
import { InputItem } from "./components/Atoms/InputItem/InputItem";

const App: React.FC = () => {
  return (
    <div className="App">
      <InputItem name="email" />
    </div>
  );
};

export default App;
