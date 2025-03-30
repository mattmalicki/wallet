import { RootState } from "../store";

const selectCategories = (state: RootState) => state.categories.categories;
const selectIsRefreshing = (state: RootState) => state.categories.isRefreshing;
const selectCategoriesError = (state: RootState) =>
  state.categories.categoriesError;

export { selectCategories, selectIsRefreshing, selectCategoriesError };
