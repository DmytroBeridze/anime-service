import "./singleFoundAnime.scss";
import { useEffect, useState } from "react";
import { TrailerIconSVG } from "../trailerIconSVG/TrailerIconSvg";
import { NavLink, useParams } from "react-router-dom";
import AnimeService from "../services/AnimeService";
import TrailerModal from "../trailerModal/TrailerModal";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import NoSuchElement from "../noSuchElement/NoSuchElement";

const SingleFoundAnime = () => {
  const { getById, error, loading, clearError } = AnimeService();
  const { animeId } = useParams();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const {
    id,
    title,
    description,
    ratingRank,
    startDate,
    ageRatingGuide,
    showType,
    poster,
    youtubeVideoId,
  } = data;

  const getSingleAnime = (id) => {
    getById(id).then((data) => setData(data));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getSingleAnime(animeId);
  }, []);

  const Load = loading ? <Spinner /> : null;
  const Err = error ? <Error /> : null;
  const NoElement =
    data.length <= 0 && !(error || loading) ? <NoSuchElement /> : null;

  const posterAnime = !(error || loading || NoElement) ? (
    <img src={poster} alt="a" />
  ) : null;

  return (
    <>
      <div className="single-found">
        <div className="single-found__container">
          <div className="single-found__content">
            <div className="single-found__prewiev">
              <div className="single-found__poster">
                {Load}
                {Err}
                {posterAnime}
                {NoElement}
                {/* <img src={poster} alt="a" /> */}
              </div>
              <button
                className="single-found__button button_stroke button"
                onClick={() => setOpen(true)}
              >
                <TrailerIconSVG />
                <p>Watch Trailer</p>
              </button>
            </div>
            <div className="single-found__information">
              <h1 className="single-found__title">{title}</h1>
              <NavLink
                to={`/movies/searchMovie/${id}`}
                className=" single-found__title-btn button"
              >
                Episodes
              </NavLink>
              {/* <button className=" single-found__title-btn button">
                Episodes
              </button> */}
              <div className="single-found__description">
                <h3>Storyline</h3>
                <p>{description}</p>

                <table className="single-found__meta">
                  <tbody>
                    <tr>
                      <td>Rating</td>
                      <td>{ratingRank}</td>
                    </tr>
                    <tr>
                      <td>Release year</td>
                      <td>{startDate}</td>
                    </tr>
                    <tr>
                      <td>Age rating</td>
                      <td>{ageRatingGuide}</td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>{showType}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TrailerModal
        open={open}
        onClose={() => setOpen(false)}
        youtubeVideoId={youtubeVideoId}
      />
    </>
  );
};

export default SingleFoundAnime;
