import { Suspense, FC } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../Header/Header";
import { useAuth } from "../../../hooks/useAuth";

const SharedLayout: FC = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn && <Header />}
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export { SharedLayout };
