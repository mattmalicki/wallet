import { FC, MouseEvent, useEffect, useState } from "react";
import styles from "./ButtonStatistics.module.css";
import { IconSvg } from "../../Atoms/Icon/Icon";
import { Dropdown } from "../Dropdown/Dropdown";

interface BSProp {
  type: "month" | "year";
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ButtonStatistics: FC<BSProp> = (props) => {
  const [shouldRoll, setShouldRoll] = useState<boolean>(false);
  const [value, setValue] = useState<string>();

  function rollDownHandler() {
    setShouldRoll((previouseState) => !previouseState);
  }

  function clickHandler(event: MouseEvent<HTMLButtonElement>) {
    setValue(event.currentTarget.id);
  }

  useEffect(() => {
    const newDate = new Date();
    if (props.type === "month") {
      setValue(months[newDate.getMonth()]);
    }
    if (props.type === "year") {
      setValue(newDate.getFullYear().toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      className={styles.dropdownStatItem}
      onClick={rollDownHandler}
    >
      <span id={props.type}>{value}</span>
      <div className={styles.icon}>
        <IconSvg name="arrow-down" fill="none" />
      </div>
      <Dropdown
        currentValue={value}
        shouldRoll={shouldRoll}
        array={props.type === "month" ? months : [2000, 2001]}
        clickHandler={clickHandler.bind(setShouldRoll)}
      />
    </button>
  );
};

export { ButtonStatistics };
