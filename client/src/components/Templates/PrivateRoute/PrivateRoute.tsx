import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { FC, ReactNode } from "react";

interface PRProp {
  Component: ReactNode;
  redirectTo: string;
}

const PrivateRoute: FC<PRProp> = (props) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? (
    <Navigate to={props.redirectTo} />
  ) : (
    <>{props.Component}</>
  );
};

export { PrivateRoute };
