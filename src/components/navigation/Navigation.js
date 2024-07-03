import { NavLink } from "react-router-dom";
import "./navigation.scss";

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
