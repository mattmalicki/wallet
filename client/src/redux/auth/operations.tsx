import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL; // http://localhost:8000/
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT; // 8000
const USER_ENDPOINT = process.env.REACT_APP_USER_ENDPOINT; // auth/

axios.defaults.baseURL =
  REACT_APP_API_URL ?? `http://localhost:${SERVER_PORT}/`;

const setAuthAccessHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthAccessToken = () => {
  axios.defaults.headers.common.Authorization = ``;
};

const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, thunkAPI) => {
    try {
      const response = await axios.post(`${USER_ENDPOINT}`, credentials);
      setAuthAccessHeader(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await axios.post(`${USER_ENDPOINT}login`, credentials);
      setAuthAccessHeader(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post(`${USER_ENDPOINT}logout`);
    clearAuthAccessToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${USER_ENDPOINT}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const persistedToken = (state as RootState).auth.token;

    if (!persistedToken || persistedToken === null) {
      return thunkAPI.rejectWithValue(null);
    }
    setAuthAccessHeader(persistedToken);
    const response = await axios.post(`${USER_ENDPOINT}refresh`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const deleteUser = createAsyncThunk("auth/delete", async (_, thunkAPI) => {
  try {
    await axios.delete(`${USER_ENDPOINT}delete`);
    clearAuthAccessToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const updateBalance = createAsyncThunk(
  "auth/updateBalance",
  async (differance: number, thunkAPI) => {
    try {
      return differance;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export {
  register,
  login,
  logout,
  refresh,
  deleteUser,
  refreshUser,
  updateBalance,
};

type RegisterCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type LoginCredentials = { email: string; password: string };
