import { FC, FormEvent, MouseEvent, MouseEventHandler, useState } from "react";
import styles from "./TransactionForm.module.css";
import { TransactionSwitch } from "../../Atoms/TransactionSwitch/TransactionSwitch";
import { TransactionInputItem } from "../../Atoms/TransactionInputItem/TransactionInputItem";
import { Button } from "../../Atoms/Button/Button";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  addTransaction,
  TransactionType,
} from "../../../redux/transactions/operations";

import { TypeContext } from "../../../hooks/useTTypeContext";

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
  const [transactionType, setTransactionType] =
    useState<TransactionT>("income");

  const dispatch = useAppDispatch();

  function handleSwitchTransactionT() {
    setTransactionType((currentState) => {
      if (currentState === "income") return "expense";
      if (currentState === "expense") return "income";
      return "income";
    });
  }
  function handleTextClickTransactionT(event: MouseEvent<HTMLInputElement>) {
    if (event.currentTarget?.value.toLocaleLowerCase() === "income")
      setTransactionType("income");
    if (event.currentTarget?.value.toLocaleLowerCase() === "expense")
      setTransactionType("expense");
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
    const closeMe = props.handleCloseModal as Function;
    closeMe();
  }

  return (
    <TypeContext value={{ type: transactionType, setType: setTransactionType }}>
      <form className={styles.transactionFrom} onSubmit={handleSubmit}>
        <h2>{!props.isEdit ? "Add transaction" : "Edit transaction"}</h2>
        <TransactionSwitch
          actionType={!props.isEdit ? "add" : "edit"}
          transactionType={transactionType}
          switchHandler={handleSwitchTransactionT}
          textHandler={handleTextClickTransactionT}
        />
        <TransactionInputItem name="category" />
        <TransactionInputItem name="amount" />
        <TransactionInputItem name="date" />
        <TransactionInputItem name="comment" />
        <div className={styles.buttons}>
          <Button title={!props.isEdit ? "add" : "edit"} colored isSubmit />
          <Button
            title="cancel"
            colored={false}
            clickHandler={props.handleCloseModal}
          />
        </div>
      </form>
    </TypeContext>
  );
};

export { TransactionFrom };
export type { TransactionT };
