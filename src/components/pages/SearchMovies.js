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

const SearchMovies = ({ setFavoritesData }) => {
  const { getByname, error, loading, clearError } = AnimeService();
  const { anime } = useContext(AnimeContext);
  const [data, setData] = useState([]);
  const [value, setValue] = useSessionStorage("animeArr", data);
  const [open, setOpen] = useState(false);
  // const [relatedData, setRelatedData] = useState([]);
  // console.log(data);
  const searchAnime = (name) => {
    return getByname(name).then((res) => {
      setData(res);
      setValue(res);
    });
  };
  useEffect(() => {
    setData(value);
    clearError();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (anime.length > 0) {
      searchAnime(anime);
    }
  }, [anime]);

  // useEffect(() => {
  //   transformRelatedData();
  // }, [value]);

  // const transformRelatedData = () => {
  //   setRelatedData(data.slice(1));
  // };
  const relatedData = value.length > 1 ? value.slice(1) : null;
  const Load = loading ? <Spinner /> : null;
  const Err = error ? <Error /> : null;
  const NoElement =
    data.length <= 0 && !(error || loading) ? <NoSuchElement /> : null;

  const Content = !(error || loading || NoElement) ? (
    <FoundAnime
      data={data}
      setOpen={setOpen}
      open={open}
      setFavoritesData={setFavoritesData}
    />
  ) : null;

  return (
    <>
      <div className="search-movies">
        <div className="search-movies__container container">
          {Load}
          {Err}
          {Content}
          {NoElement}

          {/* -----------related anime */}
          <section className="search-movies__related-container">
            <div className="search-movies__related">
              <h3 className="search-movies__related-title">related</h3>
              <div className="search-movies__related-stroke"></div>
            </div>

            <AnimeList relatedData={relatedData} Load={Load} Err={Err} />
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

// !------without slider
// const AnimeList = ({ data, Load, Err, NoElement, relatedData }) => {
//   const Elem = ({ data }) => {
//     const { poster, title, startDate, ageRatingGuide, id } = data;
//     return (
//       <li className="search-movies__galery-element">
//         <div className="search-movies__galery-img_wrapper">
//           <img src={data.poster} alt="" />
//         </div>

//         <div className="search-movies__galery-description">
//           <div className="search-movies__galery-name">
//             {" "}
//             {data.title.length > 35
//               ? data.title.slice(0, 35) + "..."
//               : data.title}
//           </div>
//           <span className="search-movies__galery-year">{startDate}</span>
//           <span className="search-movies__galery-time">{ageRatingGuide}</span>
//         </div>
//       </li>
//     );
//   };

//   const wiev = relatedData.map((data) => <Elem data={data} key={data.id} />);

//   return <ul className="search-movies__galery">{wiev}</ul>;
// };
// !------with slider
// const AnimeList = ({ Load, Err, NoElement, relatedData }) => {
//   // console.log(relatedData);
//   const Elem = ({ data }) => {
//     const { poster, title, startDate, ageRatingGuide, id } = data;
//     return (
//       <li className="search-movies__galery-element">
//         <NavLink to={`/movies/${id}`}>
//           <div className="search-movies__galery-img_wrapper">
//             <img src={poster} alt="" />
//           </div>
//           <div className="search-movies__galery-description">
//             <div className="search-movies__galery-name">
//               {title.length > 35 ? title.slice(0, 35) + "..." : title}
//             </div>
//             <span className="search-movies__galery-year">{startDate}</span>
//             <span className="search-movies__galery-time">{ageRatingGuide}</span>
//           </div>
//         </NavLink>
//       </li>
//     );
//   };

//   const wiev = relatedData.map((data) => {
//     const content = !(Err || Load || NoElement) ? <Elem data={data} /> : null;
//     return (
//       <>
//         {content}
//         {Load}
//       </>
//     );
//   });

//   return <ul className="search-movies__galery">{wiev}</ul>;
// };

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
      <section className="search-movies__main">
        <div className="search-movies__info">
          <h1 className="search-movies__title">{title}</h1>

          {/*----------  info list */}
          <ul className="home-description__info-list">
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

        {/* ---------poster */}
        <div className="search-movies__poster">
          {/* ---------add to favorites */}
          <Favorites data={data[0].id} setFavoritesData={setFavoritesData} />
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
