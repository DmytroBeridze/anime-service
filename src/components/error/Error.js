import errorIcon from "../../resources/png/Fail2.png";

const Error = () => {
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
          src={errorIcon}
          alt="spin"
          style={{
            display: "block",
            width: "150px",
            height: "150px",
          }}
        />
      </div>
    </div>
  );
};
export default Error;
