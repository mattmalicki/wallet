import { Suspense, FC } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../Header/Header";

const SharedLayout: FC = () => {
  return (
    <>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export { SharedLayout };
