import NavBar from "../NavBar";
import Button from "../Button";
import styles from "./header.module.scss";
import loginIcon from "@/assets/login.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p>Hacker News</p>
      </div>
      <NavBar />
      <div className={styles.userAction}>
        <Button name="Login" type="text">
          <img src={loginIcon} alt="login icon" />
        </Button>
        <Button name="Submit" type="secondary" />
      </div>
    </header>
  );
};

export default Header;
