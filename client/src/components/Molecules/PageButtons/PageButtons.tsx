import { FC, useEffect, useState } from "react";
import styles from "./PageButtons.module.css";
import { IconButton } from "../../Atoms/IconButton/IconButton";
import { Link, useLocation } from "react-router-dom";

const PageButtons: FC = () => {
  const [current, setCurrent] = useState<string>("/home");
  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div className={styles.pageButtons}>
      <Link to="/home">
        <IconButton name="home" isCurrent={current === "/home"} />
      </Link>
      <Link to="/statistics">
        <IconButton
          name="statistics"
          isCurrent={current.startsWith("/statistics")}
        />
      </Link>
      <Link to="/currency">
        <IconButton name="currency" isCurrent={current === "/currency"} />
      </Link>
    </div>
  );
};

export { PageButtons };
