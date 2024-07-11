import "./trailerModal.scss";
import closeIcon from "../../resources/png/close.png";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { scrollbarHide, scrollbarShow } from "../scrollBarToggle";

const TrailerModal = ({ open, onClose, youtubeVideoId }) => {
  const nodeRef = useRef(null);

  open ? scrollbarShow() : scrollbarHide();
  return (
    <CSSTransition
      in={open}
      nodeRef={nodeRef}
      timeout={500}
      classNames="modal"
      unmountOnExit
      mountOnEnter
    >
      <div
        className="trailerModal"
        ref={nodeRef}
        onClick={(e) => {
          if (e.target.className.includes("trailerModal")) {
            onClose();
          }
        }}
      >
        <div className="trailerModal__container">
          <div className="trailerModal__content">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <button
              className="trailerModal__close-btn"
              onClick={() => onClose()}
            >
              <img src={closeIcon} alt="close" />
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
export default TrailerModal;
