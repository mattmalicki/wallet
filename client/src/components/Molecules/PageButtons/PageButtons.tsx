import { FC, useEffect, useState } from "react";
import styles from "./PageButtons.module.css";
import { IconButton } from "../../Atoms/IconButton/IconButton";
import { Link, useLocation } from "react-router-dom";
import { Balance } from "../../Atoms/Balance/Balance";

const PageButtons: FC = () => {
  const [current, setCurrent] = useState<string>("/home");
  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div className={styles.buttonsAndBalance}>
      <div className={styles.pageButtons}>
        <Link to="/home">
          <div className={styles.button}>
            <IconButton name="home" isCurrent={current === "/home"} />
            <span
              className={[
                styles.title,
                current === "/home" ? styles.current : styles.notCurrent,
              ].join(" ")}
            >
              Home
            </span>
          </div>
        </Link>
        <Link to="/statistics">
          <div className={styles.button}>
            <IconButton
              name="statistics"
              isCurrent={current.startsWith("/statistics")}
            />
            <span
              className={[
                styles.title,
                current.startsWith("/statistics")
                  ? styles.current
                  : styles.notCurrent,
              ].join(" ")}
            >
              Statistics
            </span>
          </div>
        </Link>
        <Link to="/currency">
          <div className={styles.button}>
            <IconButton name="currency" isCurrent={current === "/currency"} />
            <span
              className={[
                styles.title,
                current === "/currency" ? styles.current : styles.notCurrent,
              ].join(" ")}
            >
              Currency
            </span>
          </div>
        </Link>
      </div>
      <div className={styles.balance}>
        <Balance />
      </div>
    </div>
  );
};

export { PageButtons };
