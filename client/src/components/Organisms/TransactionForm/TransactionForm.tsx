import {
  FC,
  FormEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import styles from "./TransactionForm.module.css";
import { TransactionSwitch } from "../../Atoms/TransactionSwitch/TransactionSwitch";
import { TransactionInputItem } from "../../Atoms/TransactionInputItem/TransactionInputItem";
import { Button } from "../../Atoms/Button/Button";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  getExpensesCategories,
  getIncomeCategories,
} from "../../../redux/categories/operations";
import {
  addTransaction,
  TransactionType,
} from "../../../redux/transactions/operations";

interface TFProp {
  isEdit?: boolean;
  handleCloseModal: MouseEventHandler;
}

interface FormI extends HTMLFormElement {
  income?: HTMLInputElement;
  expense?: HTMLInputElement;
  category: HTMLInputElement;
  amount: HTMLInputElement;
  date: HTMLInputElement;
  comment?: HTMLInputElement;
}

type TransactionT = "income" | "expense";

const TransactionFrom: FC<TFProp> = (props) => {
  const [transaction, setTransaction] = useState<TransactionT>("income");
  const dispatch = useAppDispatch();

  function handleSwitchTransactionT() {
    setTransaction((currentState) => {
      if (currentState === "income") return "expense";
      if (currentState === "expense") return "income";
      return "income";
    });
  }
  function handleTextClickTransactionT(event: MouseEvent<HTMLInputElement>) {
    if (event.currentTarget?.value.toLocaleLowerCase() === "income")
      setTransaction("income");
    if (event.currentTarget?.value.toLocaleLowerCase() === "expense")
      setTransaction("expense");
  }

  function handleSubmit(event: FormEvent<FormI>) {
    event.preventDefault();
    const form = event.currentTarget;
    const income = form.income;
    const expense = form.expense;
    const categoriesIds = form.category
      .getAttribute("data-categories")!
      .split(":");
    const amount = Number(form.amount.value);
    const date = new Date(form.date.value);
    const comment = form.comment?.value;
    const transaction: TransactionType = {
      type: "+",
      categoryId: categoriesIds[0],
      childCategoryId: categoriesIds[1],
      amount,
      createdAt: date,
      comment,
    };
    if (income?.id === "income") {
      transaction.type = "+";
    }
    if (expense?.id === "expense") {
      transaction.type = "-";
    }
    dispatch(addTransaction(transaction));
  }

  useEffect(() => {
    if (transaction === "income") {
      dispatch(getIncomeCategories());
    }
    if (transaction === "expense") {
      dispatch(getExpensesCategories());
    }
  }, [transaction, dispatch]);

  return (
    <form className={styles.transactionFrom} onSubmit={handleSubmit}>
      <h2>{!props.isEdit ? "Add transaction" : "Edit transaction"}</h2>
      <TransactionSwitch
        actionType={!props.isEdit ? "add" : "edit"}
        transactionType={transaction}
        switchHandler={handleSwitchTransactionT}
        textHandler={handleTextClickTransactionT}
      />
      <TransactionInputItem name="category" />
      <TransactionInputItem name="amount" />
      <TransactionInputItem name="date" />
      <TransactionInputItem name="comment" />
      <div className={styles.buttons}>
        <Button
          title={!props.isEdit ? "add" : "edit"}
          colored
          clickHandler={props.handleCloseModal}
        />
        <Button
          title="cancel"
          colored={false}
          clickHandler={props.handleCloseModal}
        />
      </div>
    </form>
  );
};

export { TransactionFrom };
export type { TransactionT };
