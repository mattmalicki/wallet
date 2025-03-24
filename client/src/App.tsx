import React from "react";

import "./App.css";
import { AuthForm } from "./components/Organisms/AuthForm/AuthForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthForm isRegister={true} />
    </div>
  );
};

export default App;
