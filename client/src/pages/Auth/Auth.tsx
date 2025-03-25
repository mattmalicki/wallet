import { FC } from "react";
import { Page } from "../../components/Templates/Page/Page";
import { Logo } from "../../components/Atoms/Logo/Logo";
import { AuthForm } from "../../components/Organisms/AuthForm/AuthForm";

interface AuthPageProp {
  isRegister: boolean;
}

const Auth: FC<AuthPageProp> = (props) => {
  return (
    <Page>
      <Logo />
      <AuthForm isRegister={props.isRegister} />
    </Page>
  );
};

export { Auth };
