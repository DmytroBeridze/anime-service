import "./homeSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnimeService from "../services/AnimeService";
import { memo, useEffect, useMemo } from "react";
import { useState } from "react";
import spinner from "../../resources/gif/Ellipsis-loader.gif";

const HomeSlider = () => {
  console.log("render");
  const [anime, setAnime] = useState([]);
  const { getAllAnime, loader } = AnimeService();
  const Load = loader ? (
    <img
      src={spinner}
      alt="spin"
      style={{
        position: "absolute",
        left: "50%",
        top: "40%",
        display: "block",
        width: "100px",
        height: "100px",
      }}
    />
  ) : null;
  useEffect(() => {
    setAllAnime();
  }, []);

  const setAllAnime = () => {
    getAllAnime(16, 0).then((data) => setAnime(data));
  };

  // ----------setings slider------
  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 8,
    slidesToScroll: 1,
    initialSlide: 0,
    // autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1540,
        settings: {
          centerPadding: "60px",
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1470,
        settings: {
          centerPadding: "100px",
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1360,
        settings: {
          centerPadding: "60px",
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1260,
        settings: {
          centerPadding: "100px",
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1160,
        settings: {
          centerPadding: "50px",
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1020,
        settings: {
          centerPadding: "100px",
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: {
          centerPadding: "40px",
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // -----------render slider------
  const animeRender = (arr) => {
    return (
      <Slider {...settings}>
        {arr.map((data) => (
          <Wiev data={data} key={data.id} />
        ))}
      </Slider>
    );
  };
  const AnimeSlides = animeRender(anime);

  return (
    <div className="slider-container  main-slider">
      {AnimeSlides}
      {Load}
    </div>
  );
};
// -----------component
const Wiev = ({ data }) => {
  return (
    <div className="main-slider__element">
      <div className="main-slider__card">
        <img className="main-slider__img" src={data.poster} alt={data.title} />
      </div>
    </div>
  );
};

export default HomeSlider;
