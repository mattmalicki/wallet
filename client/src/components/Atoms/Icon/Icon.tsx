import Icon from "../../../images/icons-sprite.svg";
import React from "react";

type NameOpts =
  | "lock"
  | "logo"
  | "date"
  | "transaction"
  | "statistics"
  | "home"
  | "logout"
  | "email";

interface IconProp {
  name: NameOpts;
  width: string;
  height: string;
  color?: string;
}

const IconSvg: React.FC<IconProp> = (props) => {
  return (
    <svg
      className="svg-letter"
      fill={props.color ?? "currenctColor"}
      width={props.width}
      height={props.height}
    >
      <use href={`${Icon}#icon-${props.name}`} />
    </svg>
  );
};

export { IconSvg };
