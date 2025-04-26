import { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./TransactionInputDate.module.css";
import { IconSvg } from "../Icon/Icon";
import "react-datepicker/dist/react-datepicker.module.css";

interface TIDProp {
  value?: Date;
}

const TransactionInputDate: FC<TIDProp> = (props) => {
  const [value, setValue] = useState<Date>(props.value ?? new Date());

  function handleChange(value: any) {
    setValue(value);
  }

  function getYyyyMmDd(date: Date) {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  }

  useEffect(() => {
    if (props.value) {
      setValue(new Date(props.value));
    }
  }, [props.value]);

  return (
    <div>
      <input
        type="text"
        id="date"
        value={getYyyyMmDd(value)}
        className={styles.dateInput}
        readOnly
        required
      />
      <DatePicker
        dateFormat={"yyyy/MM/dd"}
        showIcon
        selected={value}
        onChange={handleChange}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        todayButton={"Today"}
        toggleCalendarOnIconClick
        icon={<IconSvg name="date" width="24px" height="24px" />}
      />
    </div>
  );
};
export { TransactionInputDate };
