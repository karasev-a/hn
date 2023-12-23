// Navigation Component
import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="new">new</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {/* Add more navigation links */}
      </ul>
    </nav>
  );
};

export default NavBar;
