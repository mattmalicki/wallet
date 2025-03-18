import { ChangeEvent, FC, FocusEvent, useEffect, useState } from "react";
import styles from "./DatePicker.module.css";
import { IconSvg } from "../Icon/Icon";

interface DatePickerProp {}

const DatePicker: FC = (props) => {
  const [date, setDate] = useState<Date>();
  const [day, setDay] = useState<string>("dd");
  const [month, setMonth] = useState<string>("mm");
  const [year, setYear] = useState<string>("yyyy");
  const [elements, setElements] = useState<HTMLInputElement[]>();

  useEffect(() => {
    const array = [];
    array.push(document.getElementById("day") as HTMLInputElement);
    array.push(document.getElementById("month") as HTMLInputElement);
    array.push(document.getElementById("year") as HTMLInputElement);
    setElements(array);
  }, [setElements]);

  function focusHandler(event: FocusEvent<HTMLInputElement>) {
    // event.target.select();
  }

  function changeDayHandler(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value === "dd") {
      event.target.select();
    }
    if (value === "") setDay("dd");
    if (isNaN(+value)) return;
    if (+value < 31 || +value >= 0) {
      setDay(value);
    }
  }
  function changeMonthHandler(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
  }
  function changeYearHandler(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
  }
  function clickIconHandler() {
    (document.getElementById("date") as HTMLInputElement).showPicker();
  }
  return (
    <div className={styles.datePicker}>
      <input
        type="date"
        id="date"
        className={styles.dateInput}
        value={date?.toString()}
      />
      <input
        type="text"
        id="day"
        value={day}
        onChange={changeDayHandler}
        className={styles.dayInput}
        size={2}
        onFocus={focusHandler}
      />
      <span>.</span>
      <input
        type="number"
        id="month"
        value={month}
        onChange={changeMonthHandler}
        className={styles.monthInput}
        size={2}
      />
      <span>.</span>
      <input
        type="number"
        id="year"
        value={year}
        onChange={changeYearHandler}
        className={styles.yearInput}
        size={4}
      />
      <button className={styles.icon} onClick={clickIconHandler}>
        <IconSvg name="date" />
      </button>
    </div>
  );
};

export { DatePicker };
