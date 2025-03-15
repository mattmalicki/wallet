import React from "react";

import "./App.css";
import { InputItem } from "./components/Atoms/InputItem/InputItem";

const App: React.FC = () => {
  return (
    <div className="App">
      <InputItem name="email" />
      <InputItem name="password" />
      <InputItem name="firstName" />
      <InputItem name="lastName" />
    </div>
  );
};

export default App;
