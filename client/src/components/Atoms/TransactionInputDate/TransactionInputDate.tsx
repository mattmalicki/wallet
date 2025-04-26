import { FC, useState } from "react";
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

  function getDdMmYyyy(date: Date) {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }

  function test(test: any) {
    console.log(test);
    console.log(typeof test);
    return true;
  }

  return (
    <div>
      <input
        type="date"
        id="date"
        value={getDdMmYyyy(value)}
        className={styles.dateInput}
      />
      <DatePicker
        showIcon
        selected={value}
        onChange={handleChange}
        icon={<IconSvg name="date" width="24px" height="24px" />}
      />
    </div>
  );
};
export { TransactionInputDate };
