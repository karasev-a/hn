// Navigation Component
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        news
      </NavLink>
      <NavLink
        to="/comments"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        comments
      </NavLink>
      <NavLink
        to="/ask"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        ask
      </NavLink>
      <NavLink
        to="/show"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        show
      </NavLink>
      <NavLink
        to="/jobs"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        jobs
      </NavLink>
    </nav>
  );
};

export default NavBar;
