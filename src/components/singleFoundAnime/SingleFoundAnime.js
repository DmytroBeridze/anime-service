import "./singleFoundAnime.scss";
import { useEffect, useState } from "react";
import { TrailerIconSVG } from "../trailerIconSVG/TrailerIconSvg";
import { NavLink, useParams } from "react-router-dom";
import AnimeService from "../services/AnimeService";
import TrailerModal from "../trailerModal/TrailerModal";

import Favorites from "../favorites/Favorites";
import finiteStateMashine from "../../utils/finiteStateMashine";

const SingleFoundAnime = ({ setFavoritesData }) => {
  const { getById, process } = AnimeService();
  const { animeId } = useParams();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const getSingleAnime = (id) => {
    getById(id).then((data) => setData(data));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getSingleAnime(animeId);
  }, []);
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

  return (
    <>
      <div className="single-found">
        <div className="single-found__container">
          <div className="single-found__content">
            <div className="single-found__prewiev">
              {/* ---------add to favorites */}
              {finiteStateMashine(process, () => (
                <>
                  <div className="single-found__poster">
                    <div className="single-found__like-wrapper">
                      <Favorites
                        data={animeId}
                        setFavoritesData={setFavoritesData}
                      />
                    </div>
                    <img src={poster} alt="a" />
                  </div>
                </>
              ))}
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
            </div>
            <div className="single-found__description">
              <h3>Storyline</h3>
              <p>{description}</p>
            </div>
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
      <TrailerModal
        open={open}
        onClose={() => setOpen(false)}
        youtubeVideoId={youtubeVideoId}
      />
    </>
  );
};

export default SingleFoundAnime;
