import spinner from "../../resources/gif/Ellipsis-loader.gif";

const Spinner = () => {
  return (
    <div className="main-slider__element">
      <div
        className="main-slider__card"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          className="slider"
          src={spinner}
          alt="spin"
          style={{
            display: "block",
            width: "100px",
            height: "100px",
          }}
        />
      </div>
    </div>
  );
};
export default Spinner;
