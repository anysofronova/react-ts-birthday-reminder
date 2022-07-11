import { useTheme } from "../../hooks/useTheme";
import styles from "./Header.module.scss";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { FC, memo } from "react";
const Header: FC = memo(() => {
  const { theme, setTheme } = useTheme();
  return (
    <div className={styles.header}>
      <div
        className={styles.switch}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
      </div>
    </div>
  );
});

export default Header;
