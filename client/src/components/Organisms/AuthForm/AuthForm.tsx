import { FC, FormEvent } from "react";
import styles from "./AuthForm.module.css";
import { AuthInputItem } from "../../Atoms/AuthInputItem/AuthInputItem";
import { Button } from "../../Atoms/Button/Button";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { login, register } from "../../../redux/auth/operations";
import { Notify } from "notiflix";

interface AuthFormProp {
  isRegister: boolean;
}

const AuthForm: FC<AuthFormProp> = (props) => {
  const dispatch = useAppDispatch();

  const handleAction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    if (props.isRegister) {
      const firstName = form.firstName.value;
      const lastName = form.lastName.value;
      const confirmPassword = form.confirmPassword.value;
      if (!email || !password || !firstName || !lastName || !confirmPassword) {
        Notify.info("Please provide all informations");
      }
      if (confirmPassword !== password) {
        Notify.failure("Passwords dont match");
        return;
      }
      dispatch(register({ email, password, firstName, lastName }));
    }
    dispatch(login({ email, password }));
  };

  return (
    <form className={styles.authForm} onSubmit={handleAction}>
      <AuthInputItem name="email" />
      <AuthInputItem name="password" />

      {props.isRegister && (
        <AuthInputItem name="confirmPassword" placeholder="Confirm password" />
      )}
      {props.isRegister && (
        <AuthInputItem name="firstName" placeholder="First name" />
      )}
      {props.isRegister && (
        <AuthInputItem name="lastName" placeholder="Last name" />
      )}
      <div className={styles.buttons}>
        <Button
          colored={true}
          title={props.isRegister ? "register" : "log in"}
          isSubmit
        />
        <Button
          colored={false}
          title={!props.isRegister ? "register" : "log in"}
          isLinked
          link={!props.isRegister ? "register" : "/"}
        />
      </div>
    </form>
  );
};

export { AuthForm };
