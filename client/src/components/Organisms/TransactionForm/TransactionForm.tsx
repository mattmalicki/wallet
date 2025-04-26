import {
  FC,
  FormEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import styles from "./TransactionForm.module.css";

import { TransactionInputAmount } from "../../Atoms/TransactionInputAmount/TransactionInputAmount";
import { TransactionInputDate } from "../../Atoms/TransactionInputDate/TransactionInputDate";
import { TransactionInputComment } from "../../Atoms/TransactionInputItem/TransactionInputComment";
import { TransactionSwitch } from "../../Atoms/TransactionSwitch/TransactionSwitch";
import { TransactionInputCategory } from "../../Molecules/InputCategory/TransactionInputCategory";
import { Button } from "../../Atoms/Button/Button";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  addTransaction,
  editTransaction,
  TransactionType,
} from "../../../redux/transactions/operations";
import { useTransactions } from "../../../hooks/useTransactions";

interface TFProp {
  isEdit?: boolean;
  id?: string;
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
  const { transactions } = useTransactions();

  const [transactionType, setTransactionType] =
    useState<TransactionT>("income");
  const [transactionComment, setTransactionComment] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [childCategoryId, setChildCategoryId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [transactionDate, setTransactionDate] = useState<Date>(new Date());

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
    const categoriesIds = form.category
      .getAttribute("data-categories-ids")!
      .split(":");
    const transaction: TransactionType = {
      type: transactionType === "income" ? "+" : "-",
      categoryId: categoriesIds[0],
      childCategoryId: categoriesIds[1],
      amount: Number(form.amount.value),
      createdAt: new Date(form.date.value),
      comment: form.comment!.value,
    };
    !props.isEdit && dispatch(addTransaction(transaction));
    props.isEdit &&
      dispatch(
        editTransaction({
          id: transactions.find((item) => item._id === props.id)!._id,
          newTransaction: transaction,
        })
      );
    const closeMe = props.handleCloseModal as Function;
    closeMe();
  }

  function setValues() {
    if (!props.id) {
      return;
    }
    const transaction = transactions.find((item) => item._id === props.id)!;
    setTransactionType(transaction.type === "+" ? "income" : "expense");
    setTransactionComment(transaction.comment ?? "");
    setCategoryId(transaction.categoryId ?? "");
    setChildCategoryId(transaction.childCategoryId ?? "");
    setAmount(transaction.amount ?? 0);
    setTransactionDate(new Date(transaction.createdAt));
  }

  useEffect(() => {
    if (props.isEdit) setValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isEdit]);

  return (
    <form
      id="transaction-form"
      className={styles.transactionFrom}
      onSubmit={handleSubmit}
    >
      <h2>{!props.isEdit ? "Add transaction" : "Edit transaction"}</h2>
      <TransactionSwitch
        actionType={!props.isEdit ? "add" : "edit"}
        transactionType={transactionType}
        switchHandler={handleSwitchTransactionT}
        textHandler={handleTextClickTransactionT}
      />
      <TransactionInputCategory
        type={transactionType}
        parentId={categoryId ?? undefined}
        childId={childCategoryId ?? undefined}
      />
      <TransactionInputAmount value={amount.toString()} />
      <TransactionInputDate value={transactionDate} />
      <TransactionInputComment value={transactionComment} />
      <div className={styles.buttons}>
        <Button title={!props.isEdit ? "add" : "edit"} colored isSubmit />
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
