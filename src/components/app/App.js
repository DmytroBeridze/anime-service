import Header from "../header/Header";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleMovie from "../pages/SingleMovie";
import { useEffect, useState } from "react";
import { AnimeContext } from "../context";
import SearchMovies from "../pages/SearchMovies";
import SingleFoundAnime from "../singleFoundAnime/SingleFoundAnime";
import Episodes from "../../components/episodes/Episodes.js";
import useCookieHook from "../../hooks/cookie.hook.js";
import FavoritesPage from "../pages/FavoritesPage.js";
import SignIn from "../auth/SignIn.js";
import SignUp from "../auth/SignUp.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";
import Chat from "../pages/Chat.js";
import Episode from "../episode/Episode.js";
// import BurgerMenue from "../burgerMenue/BurgerMenue.js";

function App() {
  const { getCookie, setCookie } = useCookieHook();
  const [anime, setAnime] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [addPadding, setAddPadding] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  // ---------adding right padding after activate burger menue
  const addingPadding = (data) => {
    setAddPadding(data);
  };
  // ---------name of one anime for searchMovie
  const setAnimeData = (data) => {
    setAnime(data);
  };
  // ---------add favorites
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

  return (
    // для передачі даних в дочірній елемент без пропсів, напряму
    <AnimeContext.Provider value={{ anime, favorites, addPadding }}>
      <BrowserRouter>
        <div className="app">
          {/* {header} */}
          <Header setAnimeData={setAnimeData} addingPadding={addingPadding} />
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
              path="/movies/searchMovie/episode/:episodeId"
              element={<SingleMovie Component={Episode} dataType="episodes" />}
            />
            <Route
              path="/favorites"
              element={<FavoritesPage setAnimeData={setAnimeData} />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AnimeContext.Provider>
  );
}

export default App;
