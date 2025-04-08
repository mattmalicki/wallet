import { FC, useState } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { Balance } from "../../components/Atoms/Balance/Balance";
import { TransactionList } from "../../components/Organisms/TransactionList/TransactionList";
import { AddTransactionButton } from "../../components/Atoms/AddTransactionButton/AddTransactionButton";
import { TransactionFrom } from "../../components/Organisms/TransactionForm/TransactionForm";
import { Modal } from "../../components/Templates/Modal/Modal";

type ActionT = "add" | "edit";
type ModalType = {
  openModal: boolean;
  actionType: ActionT;
};

const Home: FC = () => {
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
  return (
    <Page>
      <Balance balance={20000} />
      <TransactionList
        id="56gf324gerew3r4w"
        date="12.12.12"
        type="+"
        category="Income"
        comment="Nothing to say"
        sum={203443}
        editHandler={handleEditButton}
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
            />
          )}
        </Modal>
      )}
    </Page>
  );
};

export { Home };
export type { ActionT };
