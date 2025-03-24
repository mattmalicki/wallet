import { FC } from "react";
import styles from "./AuthForm.module.css";
import { AuthInputItem } from "../../Atoms/AuthInputItem/AuthInputItem";
import { Button } from "../../Atoms/Button/Button";

interface AuthFormProp {
  isRegister: boolean;
}

const AuthForm: FC<AuthFormProp> = (props) => {
  return (
    <form className={styles.authForm}>
      <AuthInputItem name="email" />
      <AuthInputItem name="password" />

      {props.isRegister && (
        <AuthInputItem name="password" placeholder="Confirm password" />
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
        />
        <Button
          colored={false}
          title={!props.isRegister ? "register" : "log in"}
        />
      </div>
    </form>
  );
};

export { AuthForm };
