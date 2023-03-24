import React from "react";
import { Link } from "react-router-dom";

const NavTabs = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/checklistManagement">ChecklistManagement</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavTabs;
