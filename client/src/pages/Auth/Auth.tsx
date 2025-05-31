import { FC } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { AuthForm } from "../../components/Organisms/AuthForm/AuthForm";
import { ImageAuth } from "../../components/Atoms/ImageAuth/ImageAuth";
import styles from "./AuthPage.module.css";

interface AuthPageProp {
  isRegister: boolean;
}

const Auth: FC<AuthPageProp> = (props) => {
  return (
    <Page class={styles.authPage}>
      <ImageAuth />
      <AuthForm isRegister={props.isRegister} />
    </Page>
  );
};

export { Auth };
