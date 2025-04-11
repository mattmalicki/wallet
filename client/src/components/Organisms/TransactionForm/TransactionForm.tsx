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

interface TFProp {
  isEdit?: boolean;
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form.income?.value);
    console.log(form.expense?.value);
    console.log(form.category.value);
    console.log(form.amount.value);
    console.log(form.date.value);
    console.log(form.comment.value);
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
        <Button title={!props.isEdit ? "add" : "edit"} colored />
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
