import "./episodes.scss";
import "../pages/chat.scss";
// ------------custom scroll styles
import { NavLink, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import AnimeService from "../services/AnimeService";
import noPicture from "../../resources/png/no-pictures.png";
import playBtn from "../../resources/png/play.png";
import finiteStateMashine from "../../utils/finiteStateMashine";
// --custom scroll
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const Episodes = () => {
  const [data, setData] = useState([]);
  const { episodesId } = useParams();
  const { getEpisodesById, process, setProcess } = AnimeService();
  const targetRef = useRef([]);
  const descriptionRef = useRef([]);
  const playBtnRef = useRef([]);

  useEffect(() => {
    setEpisodesData(episodesId);
  }, []);

  const setEpisodesData = (id) => {
    getEpisodesById(id)
      .then((resp) => setData(resp))
      .then(() => setProcess("ready"));
  };
  const openDescription = (i) => {
    targetRef.current.map((elem) => {
      elem.getElement().classList.remove("active");
      elem.getElement().scrollTo(0, 0);
    });
    targetRef.current[i].getElement().classList.add("active");

    descriptionRef.current.map((elem) => {
      elem.classList.remove("active");
    });
    descriptionRef.current[i].classList.add("active");
  };

  const closeDescription = () => {
    targetRef.current.map((elem) => {
      elem.getElement().classList.remove("active");
    });
    descriptionRef.current.map((elem) => {
      elem.classList.remove("active");
    });
  };

  const galeryItem = useCallback(() => {
    const item = data.map((data, i) => (
      <Wiev
        key={data.id}
        data={data}
        openDescription={openDescription}
        closeDescription={closeDescription}
        targetRef={targetRef}
        descriptionRef={descriptionRef}
        i={i}
        playBtnRef={playBtnRef}
      />
    ));
    return <ul className="episodes__galery">{item}</ul>;
  }, [data]);

  return (
    <div className="episodes">
      <div className="episodes__container">
        <div className="episodes__title-wrapper">
          <h3 className="episodes__header">episodes</h3>
          <div className="episodes__stroke"></div>
        </div>
        {finiteStateMashine(process, () => galeryItem())}
      </div>
    </div>
  );
};

const Wiev = ({
  data,
  openDescription,
  closeDescription,
  targetRef,
  descriptionRef,
  i,
  playBtnRef,
}) => {
  const showPlayBtn = (i) => {
    if (playBtnRef.current[i]) {
      playBtnRef.current[i].classList.add("active");
    }
  };

  const hidePlayBtn = () => {
    playBtnRef.current.map((elem) => elem.classList.remove("active"));
  };

  const { title, thumbnail, description, seasonNumber, length, airdate } = data;
  const thumb = thumbnail ? (
    <NavLink to={`/movies/searchMovie/episode/${data.id}`}>
      <div className="episodes__img">
        <img src={thumbnail.original} alt="thumb" />
        <img
          src={playBtn}
          alt="play"
          ref={(elem) => (playBtnRef.current[i] = elem)}
        />
      </div>
    </NavLink>
  ) : (
    <div className="episodes__img ">
      <img src={noPicture} alt="thumb" className="episodes__img_no-picture" />
      <img
        src={playBtn}
        alt="play"
        ref={(elem) => (playBtnRef.current[i] = elem)}
      />
    </div>
  );

  return (
    <li className="episodes__galery-item">
      <div
        className="episodes__img-container"
        onMouseEnter={() => showPlayBtn(i)}
        onMouseLeave={() => hidePlayBtn()}
      >
        {thumb}
        {/* ------------------custom scroll wrapper */}
        <OverlayScrollbarsComponent
          defer
          element="span"
          className="scroll-wrapper scroll-wrapper__episodes"
          ref={(element) => (targetRef.current[i] = element)}
        >
          <div
            className="episodes__description"
            ref={(element) => (descriptionRef.current[i] = element)}
            onClick={() => closeDescription()}
          >
            <span>Description: </span>
            {description || "---"}
          </div>
        </OverlayScrollbarsComponent>
        {description && (
          <span className="episodes__more" onClick={() => openDescription(i)}>
            more...
          </span>
        )}
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
