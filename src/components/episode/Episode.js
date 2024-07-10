import "./episode.scss";

import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TrailerIconSVG } from "../trailerIconSVG/TrailerIconSvg";
import TrailerModal from "../trailerModal/TrailerModal";
import AnimeService from "../services/AnimeService";
import finiteStateMashine from "../../utils/finiteStateMashine";
const Episode = () => {
  const [episode, setEpisode] = useState({});
  const { getEpisode, process } = AnimeService();
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

  return (
    <>
      <div className="episode">
        <div className="episode__container">
          <div className="episode__content">
            <h1 className="episode__title">{title}</h1>
            <div className="episode__prewiev">
              {finiteStateMashine(process, () => (
                <div className="episode__poster">
                  <img src={thumbnail?.original} alt={title} />
                </div>
              ))}
              <button
                className="episode__button button_stroke button"
                onClick={() => setOpen(true)}
              >
                <TrailerIconSVG />
                <p>Watch Trailer</p>
              </button>
            </div>
            <div className="episode__information">
              <div className="episode__description">
                <h3>Storyline</h3>
                <p>{description}</p>

                <div className="episode__meta-wrapper">
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
