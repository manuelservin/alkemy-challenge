import React, { useContext, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThreeBars } from "@styled-icons/octicons/ThreeBars";
import { Cross } from "@styled-icons/entypo/Cross";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
import "../../styles/Navbar.css";
import { AuthContext } from "../../context/auth/AuthContext";
import { types } from "../../types/types";

function Navbar() {
  const { dispatch } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate(-1);
  };

  const showSidebar = () => setSidebar(!sidebar);
  const handleLogout = () => {
    dispatch({
      type: types.logout,
    });
  };

  return (
    <>
      <div className={`${location.pathname !== "/" ? "navigate" : "navbar"}`}>
        <button
          className={`${location.pathname !== "/" ? "go-back" : "arrow"}`}
          onClick={handleReturn}
        >
          <ArrowIosBackOutline size={35} />
        </button>
        <button
          className={`${!sidebar ? "menu-bars" : "ocult"}`}
          onClick={showSidebar}
        >
          <ThreeBars size={35} />
        </button>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <button to="#" className="menu-bars">
              <Cross size={35} />
            </button>
          </li>
          <li className="nav-text">
            <Link to="">Home</Link>
          </li>
          <li className="nav-text">
            <Link to="search">Search</Link>
          </li>
          <li className="nav-text">
            <button className="cta__resume logout" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
