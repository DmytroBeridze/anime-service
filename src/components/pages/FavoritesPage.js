import "./favoritesPage.scss";
import { useContext, useEffect, useState } from "react";
import { AnimeContext } from "../context";
import AnimeService from "../services/AnimeService";
import AnimeList from "../animeList/AnimeList";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import useCookieHook from "../../hooks/cookie.hook";

const FavoritesPage = ({ setAnimeData }) => {
  const { getCookie, setCookie, removeCookie } = useCookieHook();
  const data = JSON.parse(getCookie("nameAnime"));
  const { getById, process, error, loading, clearError } = AnimeService();
  const [favorites, setFavorites] = useState([]);

  const getFavorites = () => {
    data.map((elem) =>
      getById(elem).then((data) =>
        setFavorites((favorites) => [...favorites, data])
      )
    );
  };

  useEffect(() => getFavorites(), []);
  // const Load = loading ? <Spinner /> : null;
  // const Err = error ? <Error /> : null;
  return (
    <div className="favorites">
      <div className="favorites__container">
        <div className="favorites__title-wrapper">
          <h3 className="favorites__header">favorites</h3>
          <div className="favorites__stroke"></div>
        </div>
        <AnimeList
          // Load={Load}
          // Err={Err}
          relatedData={favorites}
          moviesPage={"moviesPage"}
          setAnimeData={setAnimeData}
          process={process}
        />
      </div>
    </div>
  );
};
export default FavoritesPage;
