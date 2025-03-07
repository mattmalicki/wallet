import React from "react";
import { IconSvg } from "./components/Atoms/Icon/Icon";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <IconSvg name="logout" color="black" width="32px" height="32px" />
    </div>
  );
};

export default App;
