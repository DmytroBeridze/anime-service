import "./sliderArrows.scss";
import NextArrowBtn from "../../resources/png/Next arrow.png";
import PrevArrowBtn from "../../resources/png/Prev arrow.png";
const sliderArrows = () => {
  const PrewArrow = (props) => {
    const { onClick } = props;
    return (
      <img
        className="prevBtn"
        src={PrevArrowBtn}
        alt=""
        onClick={onClick}
        style={{
          zIndex: "9",
        }}
      />
    );
  };
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <img
        className="nextBtn"
        src={NextArrowBtn}
        alt=""
        onClick={onClick}
        style={{
          zIndex: "9",
        }}
      />
    );
  };

  return { PrewArrow, NextArrow };
};
export default sliderArrows;
