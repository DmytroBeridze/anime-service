import "./sliderArrows.scss";
import NextArrowBtn from "../../resources/png/Next arrow.png";
import PrevArrowBtn from "../../resources/png/Prev arrow.png";
const sliderArrows = () => {
  const PrewArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        className="prevBtn"
        src={PrevArrowBtn}
        alt=""
        onClick={onClick}
        style={{
          position: "absolute",
          top: "0px",
          left: "155px",
          zIndex: "999",
          cursor: "pointer",
        }}
      />
    );
  };
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        className="nextBtn"
        src={NextArrowBtn}
        alt=""
        onClick={onClick}
        style={{
          position: "absolute",
          top: "0px",
          left: "211px",
          zIndex: "999",
          cursor: "pointer",
        }}
      />
      //   <div
      //     className={className}
      //     style={{
      //       ...style,
      //       display: "block",
      //       background: "green",
      //       position: "absolute",
      //       top: "-20px",
      //       left: "150px",
      //     }}
      //     onClick={onClick}
      //   />
    );
  };

  return { PrewArrow, NextArrow };
};
export default sliderArrows;
