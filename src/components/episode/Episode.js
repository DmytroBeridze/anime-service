import "./episode.scss";

import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TrailerIconSVG } from "../trailerIconSVG/TrailerIconSvg";
import TrailerModal from "../trailerModal/TrailerModal";
import AnimeService from "../services/AnimeService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import finiteStateMashine from "../../utils/finiteStateMashine";
const Episode = () => {
  const [episode, setEpisode] = useState({});
  const { getEpisode, process, error, loading, clearError } = AnimeService();
  const { episodeId } = useParams();
  const [open, setOpen] = useState(false);
  const {
    title,
    description,
    length,
    airdate,
    seasonNumber,
    relationships,
    thumbnail,
    type,
  } = episode;

  useEffect(() => {
    getEpisode(episodeId).then((resp) => setEpisode(resp));
  }, []);

  // const Load = loading ? <Spinner /> : null;
  // const Err = error ? <Error /> : null;

  // const posterEpisode = !(error || loading) ? (
  //   <img src={thumbnail?.original} alt={title} />
  // ) : null;

  return (
    <>
      <div className="episode">
        <div className="episode__container">
          <div className="episode__content">
            <h1 className="episode__title">{title}</h1>
            <div className="episode__prewiev">
              <div className="episode__poster">
                {/* {Load}
                {Err} */}
                {/* {posterEpisode} */}
                {finiteStateMashine(process, () => (
                  <img src={thumbnail?.original} alt={title} />
                ))}
              </div>
              <button
                className="episode__button button_stroke button"
                onClick={() => setOpen(true)}
              >
                <TrailerIconSVG />
                <p>Watch Trailer</p>
              </button>
            </div>
            <div className="episode__information">
              {/* <h1 className="episode__title">{title}</h1> */}

              {/* <button className=" episode__title-btn button">
              Episodes
            </button> */}
              <div className="episode__description">
                <h3>Storyline</h3>
                <p>{description}</p>

                <table className="episode__meta">
                  <tbody>
                    <tr>
                      <td>Type</td>
                      <td>{type}</td>
                    </tr>
                    <tr>
                      <td>Release year</td>
                      <td>{airdate}</td>
                    </tr>
                    <tr>
                      <td>Season number</td>
                      <td>{seasonNumber}</td>
                    </tr>
                    <tr>
                      <td>Length</td>
                      <td>{length}</td>
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
        youtubeVideoId={relationships?.videos.links.self}
      />
    </>
  );
};

export default Episode;
