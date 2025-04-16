import { RootState } from "../store";

const selectCategories = (state: RootState) => state.categories.categories;
const selectExpensesCategories = (state: RootState) =>
  state.categories.categories.filter((item) => item.type === "-");
const selectIncomeCategories = (state: RootState) =>
  state.categories.categories.filter((item) => item.type === "+");
const selectIsRefreshing = (state: RootState) => state.categories.isRefreshing;
const selectCategoriesError = (state: RootState) =>
  state.categories.categoriesError;

export {
  selectCategories,
  selectExpensesCategories,
  selectIncomeCategories,
  selectIsRefreshing,
  selectCategoriesError,
};
