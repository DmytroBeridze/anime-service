import { useState } from "react";
import TrailerModal from "../trailerModal/TrailerModal";
import "./homeMainDescription.scss";

const HomeMainDescription = ({ backroundInfo }) => {
  const [open, setOpen] = useState(false);
  const {
    title,
    description,
    startDate,
    ageRatingGuide,
    ratingRank,
    showType,
    youtubeVideoId,
  } = backroundInfo;

  const desc =
    description && description.length > 450
      ? description.slice(0, 450)
      : description;
  return (
    <div className="home-description">
      <h1 className="home-description__title">{title}</h1>
      <div className="home-description__info">
        <ul className="home-description__info-list main_list">
          <li className="home-description__rating main_rating">
            <span className="">imdb</span>
            <span className="">{ratingRank}</span>
          </li>
          <li className="home-description__year">{startDate}</li>
          <li className="home-description__time">{ageRatingGuide}</li>
          <li className="home-description__genre">{showType}</li>
        </ul>
        <div className="home-description__text">
          <span>{desc}</span>
        </div>

        <div className="home-description__buttons-wrapper">
          <button
            className="button button_stroke home-description__button_stroke"
            onClick={() => setOpen(true)}
          >
            Watch Trailer
          </button>
          <button className="button" onClick={() => setOpen(true)}>
            Watch Now
          </button>
        </div>
      </div>
      <TrailerModal
        open={open}
        onClose={() => setOpen(false)}
        youtubeVideoId={youtubeVideoId}
      />
    </div>
  );
};
export default HomeMainDescription;
