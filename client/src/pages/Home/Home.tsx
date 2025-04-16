import { FC, useState, useEffect } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { Balance } from "../../components/Atoms/Balance/Balance";
import { TransactionList } from "../../components/Organisms/TransactionList/TransactionList";
import { AddTransactionButton } from "../../components/Atoms/AddTransactionButton/AddTransactionButton";
import { TransactionFrom } from "../../components/Organisms/TransactionForm/TransactionForm";
import { Modal } from "../../components/Templates/Modal/Modal";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCategories } from "../../redux/categories/operations";
import { getTransactions } from "../../redux/transactions/operations";

type ActionT = "add" | "edit";
type ModalType = {
  openModal: boolean;
  actionType: ActionT;
};

const Home: FC = () => {
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

  function handleEditButton() {
    setModalState({ openModal: true, actionType: "edit" });
  }
  function handleAddButton() {
    setModalState({ openModal: true, actionType: "add" });
  }

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getCategories());
  });
  return (
    <Page>
      <Balance balance={20000} />
      <TransactionList editHandler={handleEditButton} />
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
            />
          )}
        </Modal>
      )}
    </Page>
  );
};

export { Home };
export type { ActionT };
