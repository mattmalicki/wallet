import { FC, MouseEvent, useState } from "react";
import styles from "./DropdownStat.module.css";
import { IconSvg } from "../Icon/Icon";

interface DSProp {
  type: "month" | "year";
  clickHandler: MouseEvent<HTMLButtonElement>;
}

const DropdownStatItem: FC<DSProp> = (props) => {
  const [shouldRoll, setShouldRoll] = useState<boolean>(false);

  function rollDownHandler() {}

  return (
    <button type="button" className={styles.dropdownStatItem}>
      <span>{props.type[0].toUpperCase + props.type.slice(1)}</span>
      <div className={styles.icon}>
        <IconSvg name="arrow-down" />
      </div>
    </button>
  );
};

export { DropdownStatItem };
