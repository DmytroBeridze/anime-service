import "./header.scss";
import whiteFilmLogo from "../../resources/png/White-film-logo.png";
import { NavLink } from "react-router-dom";
import search from "../../resources/png/search-icon.png";
import { useState } from "react";
import HeaderSearch from "../headerSearch/HeaderSearch";
const Header = ({ setAnimeData }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="header">
      <div className="header-container container">
        <nav className="header-nav">
          <a href="#" className="header-nav__logo">
            <div className="header-nav__icon">
              <img src={whiteFilmLogo} alt="logo" />
            </div>
            <div>
              <span className="header-nav__title">Anime</span>
              <span className="header-nav__title ">.</span>
            </div>
          </a>
          <ul className="header-nav__nav-list">
            <li className="header-nav__nav-link active ">
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#ff004d" : "inherit",
                })}
              >
                Home
              </NavLink>
            </li>
            <li className="header-nav__nav-link">
              <NavLink
                to="movies"
                style={({ isActive }) => ({
                  color: isActive ? "#ff004d" : "inherit",
                })}
              >
                Movies
              </NavLink>
            </li>
            <li className="header-nav__nav-link">
              <a href="#">Genre</a>
            </li>
            <li className="header-nav__nav-link">
              <a href="#">News</a>
            </li>
          </ul>
        </nav>
        {/* ---search input-- */}
        <HeaderSearch open={open} setAnimeData={setAnimeData} />

        <div className="header-nav__search">
          <img
            className="header-nav__search-icon"
            src={search}
            alt="search"
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
