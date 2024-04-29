import "./header.scss";
import whiteFilmLogo from "../../resources/png/White-film-logo.png";
import search from "../../resources/png/search-icon.png";
// import play from "../../resources/png/play.png";
import { useState } from "react";
import HeaderSearch from "../headerSearch/HeaderSearch";
const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="header-nav-container">
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
        </ul>
      </nav>
      {/* ---search input-- */}
      <HeaderSearch open={open} />

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
  );
};

// ----------------search input component
// const Search = ({ open }) => {
//   return (
//     <form
//       action=""
//       className={
//         open ? "header-nav__search-form active" : "header-nav__search-form"
//       }
//     >
//       <div
//         className={
//           open
//             ? "header-nav__search-container active"
//             : "header-nav__search-container "
//         }
//       >
//         <input
//           type="search"
//           name="search"
//           id="search"
//           placeholder="Enter Title"
//           className={
//             open
//               ? "header-nav__search-input active"
//               : "header-nav__search-input "
//           }
//         />
//         <button type="submit" className="header-nav__search-btn">
//           <img src={play} alt="play" />
//         </button>
//       </div>
//     </form>
//   );
// };

export default Header;
