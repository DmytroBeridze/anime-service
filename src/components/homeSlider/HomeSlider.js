import "./homeSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnimeService from "../services/AnimeService";
import { memo, useEffect, useMemo } from "react";
import { useState } from "react";
import spinner from "../../resources/gif/Ellipsis-loader.gif";
import imgStub from "../../resources/img/130906936alAOy7.png";

const HomeSlider = () => {
  console.log("render");
  const [anime, setAnime] = useState([]);
  const { getAllAnime, loader } = AnimeService();
  useEffect(() => {
    setAllAnime();
  }, []);

  const setAllAnime = () => {
    // console.log("render");
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

  // --------spinner
  const Load = loader ? (
    <div className="main-slider__element">
      <div className="main-slider__card">
        <img
          className="slider"
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
      </div>
    </div>
  ) : null;

  // -----------render slider------
  const animeRender = (arr) => {
    return arr.map((data, i) => (
      <div className="main-slider__element">
        <div className="main-slider__card">
          {Load}
          {<Wiev data={data} key={i} />}
        </div>
      </div>
    ));
  };

  const AnimeSlides = animeRender(anime);

  return (
    <div className="slider-container  main-slider">
      <Slider {...settings}>
        {/* {Load} */}
        {AnimeSlides}
      </Slider>
    </div>
  );
};
// ---------content--------
const Wiev = ({ data }) => {
  return (
    <img className="main-slider__img" src={data.poster} alt={data.title} />
  );
};
// !------------------------------------
// const HomeSlider = () => {
//   const [anime, setAnime] = useState([]);
//   const { getAllAnime, loader } = AnimeService();
//   useEffect(() => {
//     setAllAnime();
//   }, []);

//   const setAllAnime = () => {
//     console.log("render");
//     getAllAnime(16, 0).then((data) => setAnime(data));
//   };

//   // ----------setings slider------
//   const settings = {
//     centerMode: true,
//     infinite: true,
//     centerPadding: "100px",
//     slidesToShow: 8,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     // autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     responsive: [
//       {
//         breakpoint: 1700,
//         settings: {
//           slidesToShow: 7,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1540,
//         settings: {
//           centerPadding: "60px",
//           slidesToShow: 7,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1470,
//         settings: {
//           centerPadding: "100px",
//           slidesToShow: 6,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1360,
//         settings: {
//           centerPadding: "60px",
//           slidesToShow: 6,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1260,
//         settings: {
//           centerPadding: "100px",
//           slidesToShow: 5,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1160,
//         settings: {
//           centerPadding: "50px",
//           slidesToShow: 5,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1020,
//         settings: {
//           centerPadding: "100px",
//           slidesToShow: 4,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 980,
//         settings: {
//           centerPadding: "40px",
//           slidesToShow: 4,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   // --------spinner
//   const Load = loader ? (
//     <div className="main-slider__element">
//       <div className="main-slider__card">
//         <img
//           className="slider"
//           src={spinner}
//           alt="spin"
//           style={{
//             position: "absolute",
//             left: "50%",
//             top: "40%",
//             display: "block",
//             width: "100px",
//             height: "100px",
//           }}
//         />
//       </div>
//     </div>
//   ) : null;

//   // -----------render slider------
//   const animeRender = (arr) => {
//     return arr.map((data, i) => (
//       <div className="main-slider__element">
//         <div className="main-slider__card">
//           {Load}
//           {<Wiev data={data} key={i} />}
//         </div>
//       </div>
//     ));
//   };

//   const AnimeSlides = animeRender(anime);

//   return (
//     <div className="slider-container  main-slider">
//       <Slider {...settings}>
//         {/* {Load} */}
//         {AnimeSlides}
//       </Slider>
//     </div>
//   );
// };
// // ---------content--------
// const Wiev = ({ data, loader }) => {
//   // console.log("render");
//   return (
//     <img className="main-slider__img" src={data.poster} alt={data.title} />
//   );
// };

export default HomeSlider;
