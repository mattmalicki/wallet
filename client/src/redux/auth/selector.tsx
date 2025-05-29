import { RootState } from "../store";

const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
const selectUser = (state: RootState) => state.auth.user;
const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
const selectAuthError = (state: RootState) => state.auth.error;

export { selectIsLoggedIn, selectUser, selectIsRefreshing, selectAuthError };
