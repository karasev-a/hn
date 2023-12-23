import NavBar from "../NavBar";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <p>Header</p>

      <NavBar />
    </header>
  );
};

export default Header;
