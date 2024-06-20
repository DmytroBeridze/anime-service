import "./episodes.scss";
import "../pages/chat.scss";
// ------------custom scroll styles
import "overlayscrollbars/styles/overlayscrollbars.css";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import AnimeService from "../services/AnimeService";
import noPicture from "../../resources/png/no-pictures.png";
import useScrollHook from "../../hooks/scroll.hook";

// --custom scroll
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const Episodes = () => {
  const [data, setData] = useState([]);
  // const [open, setOpen] = useState(false);
  const { episodesId } = useParams();
  const { getEpisodesById } = AnimeService();
  const targetRef = useRef([]);
  const descriptionRef = useRef([]);

  // const scrollRef = useRef([]);
  // useScrollHook(scrollRef.current);

  // console.log(targetRef.current[2].getElement());
  useEffect(() => {
    setEpisodesData(episodesId);
  }, []);

  const setEpisodesData = (id) => {
    getEpisodesById(id).then((resp) => setData(resp));
  };

  const openDescription = (i) => {
    // setOpen(!open);
    targetRef.current.map((elem) => {
      elem.getElement().classList.remove("active");
      elem.getElement().scrollTo(0, 0);
    });
    targetRef.current[i].getElement().classList.add("active");
    // --------------------
    descriptionRef.current.map((elem) => {
      elem.classList.remove("active");
    });
    descriptionRef.current[i].classList.add("active");
  };

  // const openDescription = (i) => {
  //   setOpen(!open);
  //   targetRef.current.map((elem) => {
  //     elem.classList.remove("active");
  //     elem.scrollTo(0, 0);
  //   });
  //   targetRef.current[i].classList.add("active");
  // };

  const closeDescription = () => {
    targetRef.current.map((elem) => {
      elem.getElement().classList.remove("active");
      elem.getElement().scrollTo(0, 0);
    });
  };
  // const closeDescription = () => {
  //   targetRef.current.map((elem) => {
  //     elem.classList.remove("active");
  //     elem.scrollTo(0, 0);
  //   });
  // };

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
        {/* ----galery */}
        {galeryItem()}
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
}) => {
  const { title, thumbnail, description, seasonNumber, length, airdate } = data;
  const thumb = thumbnail ? (
    <div className="episodes__img">
      <img src={thumbnail.original} alt="thumb" />
    </div>
  ) : (
    <div className="episodes__img">
      <img src={noPicture} style={{ objectFit: "cover" }}></img>
    </div>
  );

  return (
    <li className="episodes__galery-item">
      <div className="episodes__img-container">
        {thumb}
        {/* ------------------custom scroll wrapper */}
        <OverlayScrollbarsComponent
          defer
          element="span"
          // options={{ scrollbars: { autoHide: "scroll" } }}
          className="scroll-wrapper"
          ref={(element) => (targetRef.current[i] = element)}
        >
          <div
            className="episodes__description"
            ref={(element) => (descriptionRef.current[i] = element)}
            onClick={() => closeDescription()}
          >
            <span>Description: </span>
            {description}
          </div>
        </OverlayScrollbarsComponent>
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

// import "./episodes.scss";
// import "../pages/chat.scss";
// // ------------custom scroll styles
// import "overlayscrollbars/styles/overlayscrollbars.css";
// import { useParams } from "react-router-dom";
// import { useCallback, useEffect, useRef, useState } from "react";
// import AnimeService from "../services/AnimeService";
// import noPicture from "../../resources/png/no-pictures.png";
// import useScrollHook from "../../hooks/scroll.hook";

// const Episodes = () => {
//   const [data, setData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const { episodesId } = useParams();
//   const { getEpisodesById } = AnimeService();
//   const targetRef = useRef([]);

//   const scrollRef = useRef([]);

//   useScrollHook(scrollRef.current);

//   useEffect(() => {
//     setEpisodesData(episodesId);
//   }, []);

//   const setEpisodesData = (id) => {
//     getEpisodesById(id).then((resp) => setData(resp));
//   };

//   const openDescription = (i) => {
//     setOpen(!open);
//     targetRef.current.map((elem) => {
//       elem.classList.remove("active");
//       elem.scrollTo(0, 0);
//     });
//     targetRef.current[i].classList.add("active");
//   };
//   const closeDescription = () => {
//     targetRef.current.map((elem) => {
//       elem.classList.remove("active");
//       elem.scrollTo(0, 0);
//     });
//   };

//   const galeryItem = useCallback(() => {
//     const item = data.map((data, i) => (
//       <Wiev
//         key={data.id}
//         data={data}
//         openDescription={openDescription}
//         closeDescription={closeDescription}
//         targetRef={targetRef}
//         i={i}
//         scrollRef={scrollRef}
//       />
//     ));
//     return <ul className="episodes__galery">{item}</ul>;
//   }, [data]);

//   return (
//     <div className="episodes">
//       <div className="episodes__container">
//         <div className="episodes__title-wrapper">
//           <h3 className="episodes__header">episodes</h3>
//           <div className="episodes__stroke"></div>
//         </div>
//         {/* ----galery */}
//         {galeryItem()}
//       </div>
//     </div>
//   );
// };

// const Wiev = ({
//   data,
//   openDescription,
//   closeDescription,
//   targetRef,
//   i,
//   scrollRef,
// }) => {
//   const { title, thumbnail, description, seasonNumber, length, airdate } = data;

//   const thumb = thumbnail ? (
//     <div className="episodes__img">
//       <img src={thumbnail.original} alt="thumb" />
//     </div>
//   ) : (
//     <div className="episodes__img">
//       <img src={noPicture} style={{ objectFit: "cover" }}></img>
//     </div>
//   );

//   return (
//     <li className="episodes__galery-item">
//       <div className="episodes__img-container">
//         {thumb}
//         {/* -----------------------custom scroll wrapper */}
//         <div
//           className="scroll-wrapper"
//           ref={(element) => (scrollRef.current[i] = element)}
//         >
//           <div
//             className="episodes__description"
//             ref={(element) => (targetRef.current[i] = element)}
//             onClick={() => closeDescription()}
//           >
//             <span>Description: </span>
//             {description}
//           </div>
//         </div>
//         <span className="episodes__more" onClick={() => openDescription(i)}>
//           more...
//         </span>
//       </div>

//       <div className="episodes__data">
//         <span>Title:</span>
//         <h4 className="episodes__title"> {title}</h4>
//         <span>Season:</span>
//         <div className="episodes__season-number">{seasonNumber}</div>
//         <span>Length:</span>
//         <div className="episodes__length">{length}</div>
//         <span>Date:</span>
//         <div className="episodes__date"> {airdate}</div>
//       </div>
//     </li>
//   );
// };

// export default Episodes;
