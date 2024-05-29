import Header from "../header/Header";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import SingleMovie from "../pages/SingleMovie";
import { useEffect, useState } from "react";
import { AnimeContext } from "../context";
import SearchMovies from "../pages/SearchMovies";
import SingleFoundAnime from "../singleFoundAnime/SingleFoundAnime";
import Episodes from "../../components/episodes/Episodes.js";
import useCookieHook from "../../hooks/cookie.hook.js";
import FavoritesPage from "../pages/FavoritesPage.js";
function App() {
  const { getCookie, setCookie } = useCookieHook();
  const [anime, setAnime] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const setAnimeData = (data) => {
    setAnime(data);
  };

  const setFavoritesData = (data) => {
    if (favorites.find((elem) => elem === data)) {
      const res = favorites.filter((elem) => elem !== data);
      setFavorites(res);
    } else setFavorites((favorites) => [...favorites, data]);
  };

  useEffect(() => {
    getCookie("nameAnime")
      ? setFavorites(JSON.parse(getCookie("nameAnime")))
      : setFavorites([]);
  }, []);

  useEffect(
    () => setCookie("nameAnime", JSON.stringify(favorites)),
    [favorites]
  );
  console.log(favorites);

  return (
    // для передачі даних в дочірній елемент без пропсів, напряму
    <AnimeContext.Provider value={{ anime, favorites }}>
      <BrowserRouter>
        <div className="app">
          <Header setAnimeData={setAnimeData} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/movies"
              element={<MoviesPage setAnimeData={setAnimeData} />}
            />
            <Route
              path="/movies/searchMovie"
              element={<SearchMovies setFavoritesData={setFavoritesData} />}
            />
            <Route
              path="/movies/:animeId"
              element={
                <SingleMovie
                  Component={SingleFoundAnime}
                  dataType="anime"
                  setFavoritesData={setFavoritesData}
                />
              }
            />
            <Route
              path="/movies/searchMovie/:episodesId"
              element={<SingleMovie Component={Episodes} dataType="episodes" />}
            />
            <Route
              path="/favorites"
              element={<FavoritesPage setAnimeData={setAnimeData} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AnimeContext.Provider>
  );
}

export default App;
