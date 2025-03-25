import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/index";
import { FC, ReactNode } from "react";

interface RRProp {
  Component: ReactNode;
  redirectTo: string;
}

const RestrictedRoute: FC<RRProp> = (props) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={props.redirectTo} /> : props.Component;
};

export { RestrictedRoute };
