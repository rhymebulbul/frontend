import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import Backdrop from "../UIElements/Backdrop";
import MonashLab from "../UIElements/MonashLab";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <React.Fragment>
      <MainHeader>
        {/* <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1> */}
        <Link to="/">
          <div className="icon">
            <MonashLab />
          </div>
        </Link>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
