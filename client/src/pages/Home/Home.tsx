import { FC, useState } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { Balance } from "../../components/Atoms/Balance/Balance";
import { TransactionList } from "../../components/Organisms/TransactionList/TransactionList";
import { AddTransactionButton } from "../../components/Atoms/AddTransactionButton/AddTransactionButton";
import { TransactionFrom } from "../../components/Organisms/TransactionForm/TransactionForm";
import { Modal } from "../../components/Templates/Modal/Modal";
import { ActionT, ActionContent } from "../../hooks/useActionTypeContext";

const Home: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionT>("add");

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }
  return (
    <Page>
      <ActionContent.Provider value={{ actionType, setActionType }}>
        <Balance balance={20000} />
        <TransactionList
          id="56gf324gerew3r4w"
          date="12.12.12"
          type="+"
          category="Income"
          comment="Nothing to say"
          sum={203443}
          editHandler={handleOpenModal.bind(() => setActionType("edit"))}
        />
        <AddTransactionButton
          handleClick={handleOpenModal.bind(() => {
            setActionType("add");
          })}
        />
        {openModal && (
          <Modal>
            {actionType === "add" && (
              <TransactionFrom handleCloseModal={handleCloseModal} />
            )}
            {actionType === "edit" && (
              <TransactionFrom
                handleCloseModal={handleCloseModal}
                isEdit={true}
              />
            )}
          </Modal>
        )}
      </ActionContent.Provider>
    </Page>
  );
};

export { Home };
