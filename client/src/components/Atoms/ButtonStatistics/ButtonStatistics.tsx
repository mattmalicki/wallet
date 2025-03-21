import { FC, MouseEventHandler, useState } from "react";
import styles from "./ButtonStatistics.module.css";
import { IconSvg } from "../Icon/Icon";
import { Dropdown } from "../Dropdown/Dropdown";

interface BSProp {
  type: "month" | "year";
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const ButtonStatistics: FC<BSProp> = (props) => {
  const [shouldRoll, setShouldRoll] = useState<boolean>(false);

  function rollDownHandler() {
    setShouldRoll((previouseState) => !previouseState);
  }

  return (
    <button
      type="button"
      className={styles.dropdownStatItem}
      onClick={rollDownHandler}
    >
      <span>{props.type[0].toUpperCase() + props.type.slice(1)}</span>
      <div className={styles.icon}>
        <IconSvg name="arrow-down" fill="none" />
      </div>
      <Dropdown
        shouldRoll={shouldRoll}
        array={[
          "test1",
          "test2",
          "test3",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
          "test4",
        ]}
        clickHandler={props.clickHandler.bind(setShouldRoll)}
      />
    </button>
  );
};

export { ButtonStatistics };
