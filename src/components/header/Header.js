import "./header.scss";
import whiteFilmLogo from "../../resources/png/White-film-logo.png";
import userIcon from "../../resources/png/user.png";
import search from "../../resources/png/search-icon.png";
import HeaderSearch from "../headerSearch/HeaderSearch";
import { NavLink, useHref } from "react-router-dom";
import { useEffect, useState } from "react";
import useCookieHook from "../../hooks/cookie.hook";
import AuthDetails from "../auth/AuthDetails";

const Header = ({ setAnimeData, userLogin, userLoginData }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
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
                <NavLink
                  to="favorites"
                  style={({ isActive }) => ({
                    color: isActive ? "#ff004d" : "inherit",
                  })}
                >
                  Favorites
                </NavLink>
              </li>

              <li className="header-nav__nav-link">
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
          <AuthDetails userLoginData={userLoginData} />
          {/* <div className="header-nav__user"> */}
          {/* <div className="header-nav__user-mail">{login}</div> */}
          {/* <div className="header-nav__user-mail">{userLogin.email}</div> */}
          {/* <div className="header-nav__user-icon">
          <img src={userIcon} alt="user" />
        </div>
      </div> */}
        </div>
      </div>
    </>
  );
};

export default Header;
