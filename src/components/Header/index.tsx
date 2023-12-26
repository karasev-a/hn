import NavBar from "../NavBar";
import styles from "./header.module.scss";
import loginIcon from "../../assets/login.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p>Hacker News</p>
      </div>
      <NavBar />
      <div className={styles.userAction}>
        <button className={styles.loginBtn}>
          <img src={loginIcon} alt="login icon" /> Login
        </button>
        <button>Submit</button>
      </div>
    </header>
  );
};

export default Header;
