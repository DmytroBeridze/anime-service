import { NavLink } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import "./burgerMenue.scss";

import React from "react";

const BurgerMenue = ({ menueClass, updateMenue }) => {
  return (
    // <div className="burgerMenue show">
    <div className={menueClass}>
      {/* <Navigation /> */}

      <ul className="burgerMenue__nav-list" onClick={updateMenue}>
        <li className="burgerMenue__nav-link active ">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "#ff004d" : "inherit",
            })}
          >
            Home
          </NavLink>
        </li>
        <li className="burgerMenue__nav-link">
          <NavLink
            to="movies"
            style={({ isActive }) => ({
              color: isActive ? "#ff004d" : "inherit",
            })}
          >
            Movies
          </NavLink>
        </li>
        <li className="burgerMenue__nav-link">
          <NavLink
            to="favorites"
            style={({ isActive }) => ({
              color: isActive ? "#ff004d" : "inherit",
            })}
          >
            Favorites
          </NavLink>
        </li>

        <li className="burgerMenue__nav-link">
          <NavLink
            to={"chat"}
            style={({ isActive }) => ({
              color: isActive ? "#ff004d" : "inherit",
            })}
          >
            Chat
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default BurgerMenue;
