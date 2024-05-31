import { NavLink, useNavigate } from "react-router-dom";
import "./animeList.scss";

// !------without spinner
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

// !------with spinner
const AnimeList = ({
  Load,
  Err,
  NoElement,
  relatedData,
  moviesPage,
  setAnimeData,
}) => {
  const history = useNavigate();
  const getAnimeName = (title) => {
    setAnimeData(title);
    history("/movies/searchMovie");
  };

  const Elem = ({ data }) => {
    const { poster, title, startDate, ageRatingGuide, id } = data;

    if (moviesPage) {
      return (
        <li
          className="search-movies__galery-element"
          onClick={() => getAnimeName(title)}
        >
          <div className="search-movies__galery-img_wrapper">
            <img src={poster} alt="poster" />
          </div>
          <div className="search-movies__galery-description">
            <div className="search-movies__galery-name">
              {title.length > 35 ? title.slice(0, 35) + "..." : title}
            </div>
            <span className="search-movies__galery-year">{startDate}</span>
            <span className="search-movies__galery-time">{ageRatingGuide}</span>
          </div>
        </li>
      );
    } else
      return (
        <li className="search-movies__galery-element">
          <NavLink to={`/movies/${id}`}>
            <div className="search-movies__galery-img_wrapper">
              <img src={poster} alt="poster" />
            </div>
            <div className="search-movies__galery-description">
              <div className="search-movies__galery-name">
                {title.length > 35 ? title.slice(0, 35) + "..." : title}
              </div>
              <span className="search-movies__galery-year">{startDate}</span>
              <span className="search-movies__galery-time">
                {ageRatingGuide}
              </span>
            </div>
          </NavLink>
        </li>
      );
  };

  if (relatedData && relatedData.length >= 1) {
    const wiev = relatedData.map((data) => {
      const Content = !(Err || Load || NoElement) ? <Elem data={data} /> : null;
      return (
        <>
          {Content}
          {Load}
          {Err}
        </>
      );
    });
    return <ul className="search-movies__galery">{wiev}</ul>;
  } else {
    return (
      <ul className="search-movies__galery">
        <div style={{ color: "#ff004d" }}>no related movies</div>
      </ul>
    );
  }
};

export default AnimeList;
