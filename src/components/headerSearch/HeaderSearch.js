import "./headerSearch.scss";
import play from "../../resources/png/play.png";

const HeaderSearch = ({ open }) => {
  return (
    <form
      action=""
      className={
        open ? "header-nav__search-form active" : "header-nav__search-form"
      }
    >
      <div
        className={
          open
            ? "header-nav__search-container active"
            : "header-nav__search-container "
        }
      >
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Enter Title"
          className={
            open
              ? "header-nav__search-input active"
              : "header-nav__search-input "
          }
        />
        <button type="submit" className="header-nav__search-btn">
          <img src={play} alt="play" />
        </button>
      </div>
    </form>
  );
};
export default HeaderSearch;
