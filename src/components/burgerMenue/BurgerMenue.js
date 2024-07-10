import "./burgerMenue.scss";
import { NavLink } from "react-router-dom";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const BurgerMenue = ({ menueClass, updateMenue }) => {
  const scrollRef = useRef();
  let location = useLocation();

  // ---------custom scroll init
  const events = {
    // scroll: (e) => {},
  };
  const defer = "defer";
  const options = {
    // scrollbars: { autoHide: "scroll" },
    className: "os-theme-dark",
  };

  const [initialize, instance] = useOverlayScrollbars({
    options,
    events,
    defer,
  });
  useEffect(() => {
    initialize(scrollRef.current);
  }, []);

  // -----------link bar  toggle
  const togglelinkBar = (path) => {
    return location.pathname === path
      ? "burgerMenue__verticalBar hide"
      : "burgerMenue__verticalBar";
  };

  return (
    <div className={menueClass}>
      <div className="burgerMenue__scroll" ref={scrollRef}>
        <nav className="burgerMenue">
          <ul className="burgerMenue__nav-list" onClick={updateMenue}>
            <li className="burgerMenue__nav-link active ">
              <span className={togglelinkBar("/")}></span>
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
              <span className={togglelinkBar("/movies")}></span>

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
              <span className={togglelinkBar("/favorites")}></span>

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
              <span className={togglelinkBar("/chat")}></span>

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
        </nav>
      </div>
    </div>
  );
};

export default BurgerMenue;
