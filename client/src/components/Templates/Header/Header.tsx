import { FC, useState } from "react";
import styles from "./Header.module.css";
import { Logo } from "../../Atoms/Logo/Logo";
import { IconSvg } from "../../Atoms/Icon/Icon";
import { useAuth } from "../../../hooks/useAuth";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { logout } from "../../../redux/auth/operations";
import { Modal } from "../Modal/Modal";
import { Confirmation } from "../../Molecules/Confirmation/Confirmation";

const Header: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  function handleClickModal() {
    setOpenModal((currentState) => !currentState);
  }

  function handleLogoutAction() {
    dispatch(logout());
    handleClickModal();
  }

  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.user}>
        <span>
          {user.firstName} {user.lastName}
        </span>
        <button className={styles.icon} onClick={handleClickModal}>
          <IconSvg name="logout" />
        </button>
      </div>
      {openModal && (
        <Modal>
          <Confirmation
            statement="Do you really want to log out?"
            handleConfirm={handleLogoutAction}
            handleDiscard={handleClickModal}
          />
        </Modal>
      )}
    </header>
  );
};

export { Header };
