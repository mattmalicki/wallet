import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { isFulfilledAction, isPendingAction, isRejectAction } from "../helper";

type ChildCategory = {
  _id: string;
  title: string;
};

type Category = {
  _id: string;
  type: string;
  title: string;
  childCategories: ChildCategory[];
};

interface CategoriesState {
  categories: Category[];
  isRefreshing: boolean;
  categoriesError: any;
}

const initialState: CategoriesState = {
  categories: [],
  isRefreshing: false,
  categoriesError: null,
};

const handlePendingAction = (state: CategoriesState) => {
  state.isRefreshing = true;
  state.categoriesError = null;
};

const handleRejectedAction = (
  state: CategoriesState,
  action: PayloadAction
) => {
  state.categories = [];
  state.isRefreshing = false;
  state.categoriesError = action.payload;
};

const handleFullfiledAction = (
  state: CategoriesState,
  action: PayloadAction<any[]>
) => {
  state.categories = action.payload;
  state.isRefreshing = false;
  state.categoriesError = null;
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isFulfilledAction.bind(this, "categories"),
        handleFullfiledAction
      )
      .addMatcher(
        (action) => isPendingAction("categories", action),
        handlePendingAction
      )
      .addMatcher(
        (action) => isRejectAction("categories", action),
        handleRejectedAction
      );
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export type { Category, ChildCategory };
