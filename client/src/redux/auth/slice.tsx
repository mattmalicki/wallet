import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  refresh,
  deleteUser,
  refreshUser,
  updateBalance,
} from "./operations";
import { isPendingAction, isRejectAction } from "../helper";

interface AuthState {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    balance: number;
  };
  token: string;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: any;
}

const initialState: AuthState = {
  user: { firstName: "", lastName: "", email: "", balance: 0 },
  token: "",
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const handlePendingAction = (state: AuthState, action: PayloadAction) => {
  state.isRefreshing = true;
  state.error = null;
};

const handleRejectedAction = (state: AuthState, action?: any) => {
  if (action?.payload?.response?.status === 498) {
    state.error = { isAccessExpired: true };
    return;
  }
  state.user = { firstName: "", lastName: "", email: "", balance: 0 };
  state.error = null;
  state.token = "";
  state.isLoggedIn = false;
  state.isRefreshing = false;
  state.error = action?.payload?.response?.data?.errors[0] ?? null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        handleRejectedAction(state);
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        handleRejectedAction(state, action);
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.user.balance = state.user.balance + action.payload;
        state.isRefreshing = false;
        state.error = null;
      })
      .addMatcher(isPendingAction.bind(this, "auth"), handlePendingAction)
      .addMatcher(isRejectAction.bind(this, ""), handleRejectedAction);
  },
});

export const authReducer = authSlice.reducer;
