import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <ul className="top-nav">
      <li>
        <Link to="/heroes">Dashboard</Link>
      </li>
      <li>
        <Link to="/heroes/create">Create a Hero</Link>
      </li>
    </ul>
  );
};

export default Header;
