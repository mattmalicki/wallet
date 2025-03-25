import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

import { SharedLayout } from "./components/Templates/SharedLayout/SharedLayout";

import "./App.css";

const App: FC = () => {
  return (
    <div className="App">
      <Helmet>Wallet</Helmet>
      <Routes>
        <Route path="/" element={<SharedLayout />}></Route>
      </Routes>
    </div>
  );
};

export default App;
