import React from "react";
import { IconSvg } from "./components/Atoms/Icon/Icon";
import { Logo } from "./components/Atoms/Logo/Logo";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <IconSvg name="logout" color="black" width="32px" height="32px" />
      <Logo size="small" />
    </div>
  );
};

export default App;
