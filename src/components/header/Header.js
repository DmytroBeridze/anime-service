import "./header.scss";
import whiteFilmLogo from "../../resources/png/White-film-logo.png";
import search from "../../resources/png/search-icon.png";
const Header = () => {
  return (
    <nav className="header-nav">
      <a href="#" className="header-nav__logo">
        <div className="header-nav__icon">
          <img src={whiteFilmLogo} alt="logo" />
        </div>
        <div>
          <span className="header-nav__title">Comics</span>
          <span className="header-nav__title ">.</span>
        </div>
      </a>
      <ul className="header-nav__nav-list">
        <li className="header-nav__nav-link active ">
          <a href="#">Home</a>{" "}
        </li>
        <li className="header-nav__nav-link">
          <a href="#">Movies</a>
        </li>
        <li className="header-nav__nav-link">
          <a href="#">Genre</a>
        </li>
        <li className="header-nav__nav-link">
          <a href="#">News</a>
        </li>

        <li className="header-nav__search">
          <img className="header-nav__search-icon" src={search} alt="search" />
        </li>
      </ul>
    </nav>
  );
};
export default Header;
