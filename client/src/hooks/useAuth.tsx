import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
  selectIsRefreshing,
  selectAuthError,
} from "../redux/auth/selector";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);
  const authError = useSelector(selectAuthError);
  return { isLoggedIn, user, isRefreshing, authError };
};

export { useAuth };
