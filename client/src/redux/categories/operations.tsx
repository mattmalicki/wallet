import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CATEGORIES_ENDPOINT = process.env.REACT_APP_CATEGORIES_ENDPOINT; // categories/

const getCategories = createAsyncThunk(
  "categories/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${CATEGORIES_ENDPOINT}`);
      return response.data.categories;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const getIncomeCategories = createAsyncThunk(
  "categories/income",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${CATEGORIES_ENDPOINT}/income`);
      return response.data.categories;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const getExpensesCategories = createAsyncThunk(
  "categories/expenses",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${CATEGORIES_ENDPOINT}/expenses`);
      return response.data.categories;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export { getCategories, getExpensesCategories, getIncomeCategories };
