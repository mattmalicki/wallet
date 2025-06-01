import { FC, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./App.css";

import { SharedLayout } from "./components/Templates/SharedLayout/SharedLayout";
import { RestrictedRoute } from "./components/Templates/RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "./components/Templates/PrivateRoute/PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import { useCategories } from "./hooks/useCategories";
import { useTransactions } from "./hooks/useTransactions";
import { INotifyOptions, Notify } from "notiflix";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { refreshUser } from "./redux/auth/operations";

const AuthPage = lazy(() =>
  import("./pages/Auth/Auth").then((module) => ({
    default: module.Auth,
  }))
);
const HomePage = lazy(() =>
  import("./pages/Home/Home").then((module) => ({
    default: module.Home,
  }))
);
const CurrencyPage = lazy(() =>
  import("./pages/Currency/Currency").then((module) => ({
    default: module.Currency,
  }))
);

const StatisticsPage = lazy(() =>
  import("./pages/Statistics/Statistics").then((module) => ({
    default: module.Statistics,
  }))
);

const DetailedStatisticsPage = lazy(() =>
  import("./pages/DetailedStatistics/DetailedStatistics").then((module) => ({
    default: module.DetailedStatistics,
  }))
);

const App: FC = () => {
  const { authError } = useAuth();
  const { categoriesError } = useCategories();
  const { transactionsError } = useTransactions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const notifyOpt: INotifyOptions = {
      position: "right-top",
      opacity: 0.7,
      timeout: 3000,
      clickToClose: true,
      pauseOnHover: true,
    };
    authError && Notify.failure(authError.message, notifyOpt);
    categoriesError && Notify.failure(categoriesError.message, notifyOpt);
    transactionsError && Notify.failure(transactionsError.message, notifyOpt);
  }, [authError, categoriesError, transactionsError]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return (
    <div className="App">
      <div className="background"></div>
      <Helmet>Wallet</Helmet>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <RestrictedRoute
                redirectTo="/home"
                Component={<AuthPage isRegister={false} />}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/home"
                Component={<AuthPage isRegister={true} />}
              />
            }
          />
          <Route
            path="/home"
            element={<PrivateRoute redirectTo="/" Component={<HomePage />} />}
          />
          <Route
            path="/currency"
            element={
              <PrivateRoute redirectTo="/" Component={<CurrencyPage />} />
            }
          />
          <Route
            path="/statistics"
            element={
              <PrivateRoute redirectTo="/" Component={<StatisticsPage />} />
            }
          />
          <Route
            path="/statistics/:id"
            element={
              <PrivateRoute
                redirectTo="/"
                Component={<DetailedStatisticsPage />}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
