import { FC } from "react";
import { IconSvg, NameOpts } from "../Icon/Icon";
import styles from "./IconButton.module.css";

type ButtonNameOpts = Extract<NameOpts, "home" | "statistics" | "currency">;

interface IconButtonProp {
  name: ButtonNameOpts;
  isCurrent?: boolean;
}

const IconButton: FC<IconButtonProp> = (props) => {
  const classNames = `${styles.iconButton} ${
    props.isCurrent && styles.current
  }`;
  return (
    <div className={classNames}>
      <IconSvg name={props.name} />
    </div>
  );
};

export { IconButton };
