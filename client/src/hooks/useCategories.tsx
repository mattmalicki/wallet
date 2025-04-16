import { useSelector } from "react-redux";
import {
  selectCategories,
  selectExpensesCategories,
  selectIncomeCategories,
  selectCategoriesError,
  selectIsRefreshing,
} from "../redux/categories/selector";

const useCategories = () => {
  const categories = useSelector(selectCategories);
  const categoriesIncome = useSelector(selectIncomeCategories);
  const categoriesExpense = useSelector(selectExpensesCategories);
  const categoriesRefresh = useSelector(selectIsRefreshing);
  const categoriesError = useSelector(selectCategoriesError);
  return {
    categories,
    categoriesIncome,
    categoriesExpense,
    categoriesRefresh,
    categoriesError,
  };
};

export { useCategories };
