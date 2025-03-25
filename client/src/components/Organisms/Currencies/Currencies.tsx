import { FC } from "react";
import styles from "./Currencies.module.css";
import { CurrencyHeader } from "../../Atoms/CurrencyHeader/CurrencyHeader";
import { CurrencyListItem } from "../../Atoms/CurrencyListItem/CurrencyListItem";
import { IconSvg } from "../../Atoms/Icon/Icon";

const Currencies: FC = () => {
  return (
    <div className={styles.currencies}>
      <CurrencyHeader />
      <CurrencyListItem currency="USD" purchase={20.43} sale={21.22} />
      <CurrencyListItem currency="EUR" purchase={20.43} sale={21.22} />
      <CurrencyListItem currency="PLN" purchase={10.22} sale={11.0} />
      <CurrencyListItem currency="NOK" purchase={3.9} sale={3.2} />
      <div className={styles.iconBg}>
        <IconSvg name="currency-background" />
      </div>
    </div>
  );
};

export { Currencies };
