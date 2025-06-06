import { FC, useState, useEffect, MouseEvent } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { Balance } from "../../components/Atoms/Balance/Balance";
import { TransactionList } from "../../components/Organisms/TransactionList/TransactionList";
import { AddTransactionButton } from "../../components/Atoms/AddTransactionButton/AddTransactionButton";
import { TransactionFrom } from "../../components/Organisms/TransactionForm/TransactionForm";
import { Modal } from "../../components/Templates/Modal/Modal";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCategories } from "../../redux/categories/operations";
import {
  deleteTransaction,
  getTransactions,
} from "../../redux/transactions/operations";
import { Confirmation } from "../../components/Molecules/Confirmation/Confirmation";
import { useTransactions } from "../../hooks/useTransactions";
import { updateBalance } from "../../redux/auth/operations";

import styles from "./HomePage.module.css";

type ActionT = "add" | "edit" | "delete";
type ModalType = {
  openModal: boolean;
  actionType: ActionT;
};

const Home: FC = () => {
  const [id, setId] = useState<string>("");
  const { transactions } = useTransactions();

  const dispatch = useAppDispatch();
  const [modalState, setModalState] = useState<ModalType>({
    openModal: false,
    actionType: "add",
  });

  function handleCloseModal() {
    setModalState((prevState) => {
      return { openModal: false, actionType: prevState.actionType };
    });
  }

  function handleEditButton(event: MouseEvent<HTMLButtonElement>) {
    setModalState({ openModal: true, actionType: "edit" });
    setId(event.currentTarget.id);
  }

  function handleDeleteButton(event: MouseEvent<HTMLButtonElement>) {
    setModalState({ openModal: true, actionType: "delete" });
    setId(event.currentTarget.id);
  }

  function handleDelete() {
    const transaction = transactions.find(
      (transaction) => transaction._id === id
    )!;
    dispatch(deleteTransaction(id));
    if (transaction.type === "+") {
      dispatch(updateBalance(Number(`-${transaction.amount}`)));
    } else {
      dispatch(updateBalance(Number(`+${transaction.amount}`)));
    }
    console.log(transaction);
    handleCloseModal();
  }

  function handleAddButton() {
    setModalState({ openModal: true, actionType: "add" });
  }

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Page class={styles.homePage}>
      <div className={styles.balance}>
        <Balance />
      </div>
      <TransactionList
        editHandler={handleEditButton}
        deleteHandler={handleDeleteButton}
      />
      <AddTransactionButton handleClick={handleAddButton} />
      {modalState.openModal && (
        <Modal>
          {modalState.actionType === "add" && (
            <TransactionFrom handleCloseModal={handleCloseModal} />
          )}
          {modalState.actionType === "edit" && (
            <TransactionFrom
              handleCloseModal={handleCloseModal}
              isEdit={true}
              id={id}
            />
          )}
          {modalState.actionType === "delete" && (
            <Confirmation
              statement="Do you really want to delete this transaction?"
              handleConfirm={handleDelete}
              handleDiscard={handleCloseModal}
            />
          )}
        </Modal>
      )}
    </Page>
  );
};

export { Home };
export type { ActionT };
