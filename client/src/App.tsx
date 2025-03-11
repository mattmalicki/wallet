import React from "react";

import "./App.css";
import { Button } from "./components/Atoms/Button/Button";

const App: React.FC = () => {
  return (
    <div className="App">
      <Button title="log in" colored={true} />
      <Button title="register" colored={false} />
    </div>
  );
};

export default App;
