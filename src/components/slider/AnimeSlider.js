import "./animeSlider.scss";
import Slider from "react-slick";
import sliderArrows from "../sliderArrows/SliderArrows";
import { NavLink } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

const AnimeSlider = ({ anime, error, loading }) => {
  // ------------slider arrow--------
  const { NextArrow, PrewArrow } = sliderArrows();

  // ----------setings slider------
  const settings = {
    // centerMode: true,
    infinite: true,
    // centerPadding: "100px",
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    // nextArrow: <NextArrow />,
    prevArrow: <PrewArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          centerPadding: "80px",
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1540,
        settings: {
          centerPadding: "60px",
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1470,
        settings: {
          centerPadding: "100px",
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1360,
        settings: {
          centerPadding: "60px",
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1260,
        settings: {
          centerPadding: "150px",
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1160,
        settings: {
          centerPadding: "100px",
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1020,
        settings: {
          centerPadding: "100px",
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: {
          centerPadding: "40px",
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const Load = loading ? <Spinner /> : null;
  const Err = error ? <Error /> : null;

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
    <div className="slider-container  anime-slider">
      {AnimeSlides}
      {Load}
      {Err}
    </div>
  );
};

// -----------component
const Wiev = ({ data }) => {
  return (
    <NavLink to={`/movies/${data.id}`} className="anime-slider__element">
      <div className="anime-slider__card">
        <img className="anime-slider__img" src={data.poster} alt={data.title} />
        <div className="anime-slider__desc">{data.title}</div>
      </div>
    </NavLink>
  );
};

export default AnimeSlider;
