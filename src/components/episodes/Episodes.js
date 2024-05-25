import { useParams } from "react-router-dom";
import "./episodes.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import AnimeService from "../services/AnimeService";
import testImg from "../../resources/png/no-pictures.png";

const Episodes = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const { episodesId } = useParams();
  const { getEpisodesById } = AnimeService();
  const targetRef = useRef([]);
  useEffect(() => {
    setEpisodesData(episodesId);
  }, []);

  const setEpisodesData = (id) => {
    getEpisodesById(id).then((resp) => setData(resp));
  };

  const galeryItem = useCallback(() => {
    const item = data.map((data, i) => (
      <Wiev
        key={data.id}
        data={data}
        openDescription={openDescription}
        closeDescription={closeDescription}
        targetRef={targetRef}
        i={i}
      />
    ));
    return <ul className="episodes__galery">{item}</ul>;
  }, [data]);

  const openDescription = (i) => {
    setOpen(!open);
    targetRef.current.map((elem) => {
      elem.classList.remove("active");
      elem.scrollTo(0, 0);
    });
    targetRef.current[i].classList.add("active");
  };
  const closeDescription = () => {
    targetRef.current.map((elem) => {
      elem.classList.remove("active");
      elem.scrollTo(0, 0);
    });
  };

  return (
    <div className="episodes">
      <div className="episodes__container">
        <div className="episodes__title-wrapper">
          <h3 className="episodes__header">episodes</h3>
          <div className="episodes__stroke"></div>
        </div>
        {/* ----galery */}
        {galeryItem()}
      </div>
    </div>
  );
};

const Wiev = ({ data, openDescription, closeDescription, targetRef, i }) => {
  const { title, thumbnail, description, seasonNumber, length, airdate } = data;

  const thumb = thumbnail ? (
    <div className="episodes__img">
      <img src={thumbnail.original} alt="thumb" />
    </div>
  ) : (
    <div className="episodes__img">
      <img src={testImg} style={{ objectFit: "cover" }}></img>
    </div>
  );
  return (
    <li className="episodes__galery-item">
      <div className="episodes__img-container">
        {thumb}
        <div
          className="episodes__description"
          ref={(element) => (targetRef.current[i] = element)}
          onClick={() => closeDescription()}
        >
          <span>Description: </span>
          {description}
        </div>
        <span className="episodes__more" onClick={() => openDescription(i)}>
          more...
        </span>
      </div>

      <div className="episodes__data">
        <span>Title:</span>
        <h4 className="episodes__title"> {title}</h4>
        <span>Season:</span>
        <div className="episodes__season-number">{seasonNumber}</div>
        <span>Length:</span>
        <div className="episodes__length">{length}</div>
        <span>Date:</span>
        <div className="episodes__date"> {airdate}</div>
      </div>
    </li>
  );
};

export default Episodes;
