import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesError,
  selectIsRefreshing,
} from "../redux/categories/selector";

const useCategories = () => {
  const categories = useSelector(selectCategories);
  const categoriesRefresh = useSelector(selectIsRefreshing);
  const categoriesError = useSelector(selectCategoriesError);
  return { categories, categoriesRefresh, categoriesError };
};

export { useCategories };
