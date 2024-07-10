import "./header.scss";
import closeBurger from "../../resources/png/close-burger.png";
import menuBurger from "../../resources/png/menu-burger.png";
import search from "../../resources/png/search-icon.png";
import HeaderSearch from "../headerSearch/HeaderSearch";
import { useHref } from "react-router-dom";
import { useState } from "react";
import AuthDetails from "../auth/AuthDetails";
import HeaderLogo from "../haederLogo/HeaderLogo";
import Navigation from "../navigation/Navigation";
import BurgerMenue from "../burgerMenue/BurgerMenue";
import BurgerMenueBackdrop from "../burgerMenueBackdrop/BurgerMenueBackdrop.js";
import { scrollbarShow, scrollbarHide } from "../scrollBarToggle.js";

const Header = ({ setAnimeData }) => {
  const [open, setOpen] = useState(false);
  const [isMenuClicked, setIsMenueClicked] = useState(false);
  const [menueClass, setMenueClass] = useState("burgerMenue__wrapper");
  const href = useHref();

  const updateMenue = () => {
    setIsMenueClicked((isMenuClicked) => !isMenuClicked);
    if (!isMenuClicked) {
      setMenueClass("burgerMenue__wrapper show");

      scrollbarShow();
    } else {
      setMenueClass("burgerMenue__wrapper");
      scrollbarHide();
    }
  };

  return (
    href !== "/signin" &&
    href !== "/signup" && (
      <div className="header">
        {/* burger */}
        <BurgerMenue menueClass={menueClass} updateMenue={updateMenue} />
        {isMenuClicked && <BurgerMenueBackdrop updateMenue={updateMenue} />}

        <div className="header-container container">
          <div className="header__burger-button" onClick={updateMenue}>
            <img src={!isMenuClicked ? menuBurger : closeBurger} alt="close" />
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
