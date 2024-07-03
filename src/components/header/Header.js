import "./header.scss";
// import whiteFilmLogo from "../../resources/png/White-film-logo.png";
// import userIcon from "../../resources/png/user.png";
import closeBurger from "../../resources/png/close-burger.png";
import menuBurger from "../../resources/png/menu-burger.png";
import search from "../../resources/png/search-icon.png";
import HeaderSearch from "../headerSearch/HeaderSearch";
import { NavLink, useHref } from "react-router-dom";
import { useEffect, useState } from "react";
// import useCookieHook from "../../hooks/cookie.hook";
import AuthDetails from "../auth/AuthDetails";
import HeaderLogo from "../haederLogo/HeaderLogo";
import Navigation from "../navigation/Navigation";
import BurgerMenue from "../burgerMenue/BurgerMenue";
import BurgerMenueBackdrop from "../burgerMenueBackdrop/BurgerMenueBackdrop.js";

const Header = ({ setAnimeData }) => {
  const [open, setOpen] = useState(false);
  const [isMenuClicked, setIsMenueClicked] = useState(false);
  const [menueClass, setMenueClass] = useState("burgerMenue");

  const href = useHref();
  const updateMenue = () => {
    setIsMenueClicked((isMenuClicked) => !isMenuClicked);
    // -!isMenuClicked--тому що в стейті попереднє значення.
    // якщо залишити isMenuClicked, то буде считуватися попереднє і невірно працювати переключення
    if (!isMenuClicked) {
      setMenueClass("burgerMenue show");
    } else setMenueClass("burgerMenue");
  };

  return (
    href !== "/signin" &&
    href !== "/signup" && (
      <div className="header">
        {/* burger */}
        <BurgerMenue menueClass={menueClass} updateMenue={updateMenue} />
        {isMenuClicked && <BurgerMenueBackdrop updateMenue={updateMenue} />}

        <div className="header-container container">
          <div
            className="header__burger-button"
            onClick={updateMenue}
          >
            <img src={!isMenuClicked ? menuBurger : closeBurger} alt="close" />
            {/* <img src={!isMenuClicked ? menuBurger : closeBtn} alt="close" /> */}
          </div>
          <nav className="header-nav">
            <HeaderLogo />
            <Navigation />
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
          <AuthDetails />
        </div>
      </div>
    )
  );
};

export default Header;
