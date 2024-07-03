import "./HeaderLogo.scss";
import whiteFilmLogo from "../../resources/png/White-film-logo.png";

const HeaderLogo = ({ cl = null }) => {
  return (
    <a href="#" className={`header-nav__logo ${cl}`}>
      <div className="header-nav__icon">
        <img src={whiteFilmLogo} alt="logo" />
      </div>
      <div className="header-nav__title-wrapper">
        <span className="header-nav__title">Anime</span>
        <span className="header-nav__title ">.</span>
      </div>
    </a>
  );
};

export default HeaderLogo;
