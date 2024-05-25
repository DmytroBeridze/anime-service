import Header from "../header/Header";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import SingleMovie from "../pages/SingleMovie";
import { useState } from "react";
import { AnimeContext } from "../context";
import SearchMovies from "../pages/SearchMovies";
import SingleFoundAnime from "../singleFoundAnime/SingleFoundAnime";
import Episodes from "../../components/episodes/Episodes.js";
function App() {
  const [anime, setAnime] = useState([]);
  const setAnimeData = (data) => {
    setAnime(data);
  };

  return (
    // для передачі даних в дочірній елемент без пропсів, напряму
    <AnimeContext.Provider value={{ anime }}>
      <BrowserRouter>
        <div className="app">
          <Header setAnimeData={setAnimeData} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/movies"
              element={<MoviesPage setAnimeData={setAnimeData} />}
            />
            <Route path="/movies/searchMovie" element={<SearchMovies />} />
            <Route
              path="/movies/:animeId"
              element={
                <SingleMovie Component={SingleFoundAnime} dataType="anime" />
              }
            />
            <Route
              path="/movies/searchMovie/:episodesId"
              element={<SingleMovie Component={Episodes} dataType="episodes" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AnimeContext.Provider>
  );
}

export default App;
