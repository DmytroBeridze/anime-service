import "./homeSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnimeService from "../services/AnimeService";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
// import spinner from "../../resources/gif/Ellipsis-loader.gif";
// import errorIcon from "../../resources/png/Fail2.png";
import sliderArrows from "../sliderArrows/SliderArrows";
import LoadableImage from "../loadableImage/LoadableImage";
import { NavLink } from "react-router-dom";

const HomeSlider = () => {
  const [anime, setAnime] = useState([]);
  const { getAllAnime, error, loading, clearError } = AnimeService();

  useEffect(() => {
    clearError();
    setAllAnime();
  }, []);

  const setAllAnime = () => {
    const random = Math.floor(Math.random() * (5000 - 1) + 1);
    getAllAnime(16, random).then((data) => setAnime(data));
  };
  // ------------slider arrow--------
  const { NextArrow, PrewArrow } = sliderArrows();

  // ----------setings slider------
  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrewArrow />,
    initialSlide: 0,
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

  // --------spinner
  const Load = loading ? <Spinner /> : null;
  // ----------error
  const Err = error ? <Error /> : null;

  // -----------render slider------
  // const animeRender = (arr) => {
  //   const wiev = arr.map((data) => {
  //     const content = !(Err || Load) ? (
  //       <Wiev data={data} key={data.id} />
  //     ) : null;
  //     return (
  //       <>
  //         {content}
  //         {Load}
  //       </>
  //     );
  //   });

  //   return <Slider {...settings}> {wiev} </Slider>;
  // };

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
      {Err}
    </div>
  );
};
// -----------component
const Wiev = ({ data }) => {
  return (
    <NavLink to={`/movies/${data.id}`} className="main-slider__element">
      <div className="main-slider__card">
        <img className="main-slider__img" src={data.poster} alt={data.title} />
      </div>
    </NavLink>
  );
  // return (
  //   <AnimeSlider
  //     anime={anime}
  //     error={error}
  //     loading={loading}
  //     clearError={clearError}
  //   />
  // );
};

export default HomeSlider;
