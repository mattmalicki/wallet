import { FC, MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import styles from "./ButtonStatistics.module.css";
import { IconSvg } from "../../Atoms/Icon/Icon";
import { Dropdown } from "../Dropdown/Dropdown";
import { MonthsAndYears } from "../../../hooks/useDate";

interface BSProp {
  type: "month" | "year";
  handleClick: MouseEventHandler<HTMLButtonElement>;
  currentValue: string;
}

const ButtonStatistics: FC<BSProp> = (props) => {
  const [shouldRoll, setShouldRoll] = useState<boolean>(false);
  const dateClass = new MonthsAndYears();

  function rollDownHandler() {
    setShouldRoll((previouseState) => !previouseState);
  }

  return (
    <button
      type="button"
      className={styles.dropdownStatItem}
      onClick={rollDownHandler}
    >
      <span id={props.type}>{props.currentValue}</span>
      <div className={styles.icon}>
        <IconSvg name="arrow-down" fill="none" />
      </div>
      <Dropdown
        currentValue={props.currentValue}
        shouldRoll={shouldRoll}
        array={props.type === "month" ? dateClass.months : dateClass.years}
        clickHandler={props.handleClick.bind(setShouldRoll)}
      />
    </button>
  );
};

export { ButtonStatistics };
