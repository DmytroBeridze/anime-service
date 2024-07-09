import "./searchMovies.scss";
import { AnimeContext } from "../context";
import { useContext, useEffect, useState } from "react";
import stroke from "../../resources/png/stroke.png";
import AnimeService from "../services/AnimeService";
import useSessionStorage from "../../hooks/sessionStorage.hook";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import NoSuchElement from "../noSuchElement/NoSuchElement";
import { NavLink } from "react-router-dom";
import TrailerModal from "../trailerModal/TrailerModal";
import AnimeList from "../animeList/AnimeList";
import Favorites from "../favorites/Favorites";
import finiteStateMashine from "../../utils/finiteStateMashine";

const SearchMovies = ({ setFavoritesData }) => {
  const { getByname, error, loading, clearError, process, setProcess } =
    AnimeService();
  const { anime } = useContext(AnimeContext);
  const [data, setData] = useState([]);
  const [value, setValue] = useSessionStorage("animeArr", data);
  const [open, setOpen] = useState(false);
  const searchAnime = (name) => {
    getByname(name)
      .then((res) => {
        setData(res);
        setValue(res);
      })
      .then(() => setProcess("ready"));
  };
  useEffect(() => {
    setData(value);
    clearError();
    window.scrollTo(0, 0);
    setProcess("ready");
  }, []);

  useEffect(() => {
    if (anime.length > 0) {
      searchAnime(anime);
    }
  }, [anime]);

  const relatedData = value.length > 1 ? value.slice(1) : null;
  const NoElement =
    data.length <= 0 && !(error || loading) ? <NoSuchElement /> : null;

  return (
    <>
      <div className="search-movies">
        <div className="search-movies__container container">
          {NoElement ||
            finiteStateMashine(process, () => (
              <FoundAnime
                data={data}
                setOpen={setOpen}
                open={open}
                setFavoritesData={setFavoritesData}
              />
            ))}

          {/* -----------related anime */}
          <section className="search-movies__related-container">
            <div className="search-movies__related">
              <h3 className="search-movies__related-title">related</h3>
              <div className="search-movies__related-stroke"></div>
            </div>

            <AnimeList relatedData={relatedData} process={process} />
          </section>
        </div>
      </div>

      {/* <TrailerModal
        open={open}
        onClose={() => {
          setOpen(false);
          document.body.style.overflow = "";
        }}
        youtubeVideoId={value[0].youtubeVideoId}
      /> */}
    </>
  );
};

const FoundAnime = ({ data, setOpen, open, setFavoritesData }) => {
  const {
    id,
    description,
    poster,
    title,
    startDate,
    ageRatingGuide,
    ratingRank,
    showType,
    youtubeVideoId,
  } = data[0];
  return (
    <>
      <h1 className="search-movies__title">{title}</h1>
      <section className="search-movies__main">
        <div className="search-movies__info">
          {/*----------  info list */}
          <ul className="home-description__info-list search-movies__info-list">
            <li className="home-description__rating">
              <span className="">imdb</span>
              <span className="">{ratingRank}</span>
            </li>
            <li className="home-description__year">{startDate}</li>
            <li className="home-description__time">{ageRatingGuide}</li>
            <li className="home-description__genre">{showType}</li>
          </ul>

          {/* ---------movies__description */}
          <div className="search-movies__description">{description}</div>
          <div className="search-movies__buttons-wrapper">
            <button
              className=" button button_stroke"
              onClick={() => setOpen(true)}
            >
              Watch Trailer
            </button>

            <NavLink to={`/movies/searchMovie/${id}`} className="button">
              Episodes
            </NavLink>
          </div>
        </div>

        {/* ---------poster */}
        <div className="search-movies__poster">
          {/* ---------add to favorites */}
          <div className="search-movies__likeWrapper">
            <Favorites data={data[0].id} setFavoritesData={setFavoritesData} />
          </div>
          <img src={poster} alt="semple img" />
          <img src={stroke} alt="stroke" />
        </div>
      </section>

      <TrailerModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        youtubeVideoId={youtubeVideoId}
      />
    </>
  );
};

export default SearchMovies;

{
}
