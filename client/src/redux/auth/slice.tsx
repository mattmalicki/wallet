import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { register, login, logout, refresh, deleteUser } from "./operations";
import { isPendingAction, isRejectAction } from "../helper";

interface AuthState {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  token: string;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  authError: any;
}

const initialState: AuthState = {
  user: { firstName: "", lastName: "", email: "" },
  token: "",
  isLoggedIn: false,
  isRefreshing: false,
  authError: null,
};

const handlePendingAction = (state: AuthState, action: PayloadAction) => {
  state.isRefreshing = true;
  state.authError = null;
};

const handleRejectedAction = (state: AuthState, action: PayloadAction) => {
  state.user = { firstName: "", lastName: "", email: "" };
  state.authError = null;
  state.token = "";
  state.isLoggedIn = false;
  state.isRefreshing = false;
  state.authError = action.payload;
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
        state.authError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.authError = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        handleRejectedAction(state, action);
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.authError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        handleRejectedAction(state, action);
      })
      .addMatcher(isPendingAction.bind(this, "auth"), handlePendingAction)
      .addMatcher(isRejectAction.bind(this, "auth"), handleRejectedAction);
  },
});

export const authReducer = authSlice.reducer;
