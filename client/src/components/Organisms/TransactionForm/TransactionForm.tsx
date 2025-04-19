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
  addTransaction,
  editTransaction,
  TransactionType,
} from "../../../redux/transactions/operations";

import {
  TypeContext,
  CommentContext,
  ParentCattegoryContext,
  ChildCattegoryContext,
  AmountContext,
  DateContext,
} from "../../../hooks/useTransactionsContexts";
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

  function getDdMmYyyy(date: Date) {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }

  function setValuesToElements(values: {
    comment: string;
    amount: number;
    date: Date;
    categoriesValues: { parentId: string; childId: string; childValue: string };
  }) {
    const form = document.getElementById("transaction-form") as HTMLFormElement;
    form.comment.value = values.comment;
    form.amount.value = values.amount.toString();
    form.date.value = getDdMmYyyy(values.date);
    form.category.value = values.categoriesValues.childValue;
    form.category.id =
      values.categoriesValues.parentId + ":" + values.categoriesValues.childId;
  }

  function handleSubmit(event: FormEvent<FormI>) {
    event.preventDefault();
    const transaction: TransactionType = {
      type: transactionType === "income" ? "+" : "-",
      categoryId,
      childCategoryId,
      amount,
      createdAt: transactionDate,
      comment: transactionComment,
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
    setValuesToElements({
      comment: transaction.comment,
      amount: transaction.amount,
      date: new Date(transaction.createdAt),
      categoriesValues: {
        parentId: transaction.categoryId,
        childId: transaction.childCategoryId,
        childValue: transaction.childCategoryId,
      },
    });
  }

  useEffect(() => {
    if (props.isEdit) setValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TypeContext
      value={{ value: transactionType, setValue: setTransactionType }}
    >
      <DateContext
        value={{ value: transactionDate, setValue: setTransactionDate }}
      >
        <CommentContext
          value={{ value: transactionComment, setValue: setTransactionComment }}
        >
          <AmountContext value={{ value: amount, setValue: setAmount }}>
            <ParentCattegoryContext
              value={{ value: categoryId, setValue: setCategoryId }}
            >
              <ChildCattegoryContext
                value={{ value: childCategoryId, setValue: setChildCategoryId }}
              >
                <form
                  id="transaction-form"
                  className={styles.transactionFrom}
                  onSubmit={handleSubmit}
                >
                  <h2>
                    {!props.isEdit ? "Add transaction" : "Edit transaction"}
                  </h2>
                  <TransactionSwitch
                    actionType={!props.isEdit ? "add" : "edit"}
                    transactionType={transactionType}
                    switchHandler={handleSwitchTransactionT}
                    textHandler={handleTextClickTransactionT}
                  />
                  <TransactionInputItem
                    name="category"
                    childId={props.isEdit ? childCategoryId : undefined}
                  />
                  <TransactionInputItem name="amount" />
                  <TransactionInputItem name="date" />
                  <TransactionInputItem name="comment" />
                  <div className={styles.buttons}>
                    <Button
                      title={!props.isEdit ? "add" : "edit"}
                      colored
                      isSubmit
                    />
                    <Button
                      title="cancel"
                      colored={false}
                      clickHandler={props.handleCloseModal}
                    />
                  </div>
                </form>
              </ChildCattegoryContext>
            </ParentCattegoryContext>
          </AmountContext>
        </CommentContext>
      </DateContext>
    </TypeContext>
  );
};

export { TransactionFrom };
export type { TransactionT };
