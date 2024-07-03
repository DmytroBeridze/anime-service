import "./moviesPage.scss";
import { useEffect, useMemo, useState } from "react";
import AnimeList from "../animeList/AnimeList";
import Spinner from "../spinner/Spinner";
import AnimeService from "../services/AnimeService";
import AnimeSlider from "../slider/AnimeSlider";
import { Formik } from "formik";
import * as Yup from "yup";
import BtnScrollUp from "../btnScrollUp/BtnScrollUp";
import finiteStateMashine from "../../utils/finiteStateMashine";
// import NoSuchElement from "../noSuchElement/NoSuchElement";
// import Error from "../error/Error";
// import moviesDecor from "../../resources/img/mooviesPageDecor.png";

const MoviesPage = ({ setAnimeData }) => {
  const {
    getTrandingAnime,
    getAllAnime,
    getByYear,
    error,
    loading,
    clearError,
    process,
    setProcess,
  } = AnimeService();

  const [ratingData, setRatingData] = useState([]);
  const [allAnimeData, setAllAnimeData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [year, setYear] = useState(0);
  const [category, setCategory] = useState(0);
  const [datatype, setDatatipe] = useState("random");
  // ---toggle slider spinner
  const [sliderLoadToggle, setsliderLoadToggle] = useState(true);

  const ratingAnime = () => {
    getTrandingAnime()
      .then((data) => setRatingData(data))
      .then(() => setProcess("ready"));
  };

  const loadAnime = (year, offset, category) => {
    setsliderLoadToggle(false);
    switch (datatype) {
      case "yearSearch":
        getByYearAnime(year, category, offset);
        break;
      case "random":
        allAnime();
        break;
    }
  };

  const allAnime = () => {
    getAllAnime(16, offset).then((data) => {
      setAllAnimeData((animeData) => [...animeData, ...data]);
      setOffset((offset) => offset + 16);
    });
  };

  const getByYearAnime = (year, category, offset) => {
    getByYear(year, offset, category).then((data) =>
      setAllAnimeData((animeData) => [...animeData, ...data])
    );
    setOffset((offset) => offset + 18);
    setYear(year);
    setCategory(category);
  };

  useEffect(() => {
    ratingAnime();
    allAnime();
    clearError();
    window.scrollTo(0, 0);
  }, []);
  const validationSchema = Yup.object().shape({
    year: Yup.number().moreThan(1925, "since 1926").required("Required"),
  });
  const Load = loading ? <Spinner /> : null;
  // const Err = error ? <Error /> : null;
  // --- slider spinner
  const sliderLoad = loading && sliderLoadToggle ? <Spinner /> : null;
  useEffect(() => {
    setsliderLoadToggle(true);
  }, []);

  // const element = useMemo(
  //   () => (!(loading || error) ? <AnimeSlider anime={ratingData} /> : null),
  //   [ratingData, sliderLoad]
  // );

  return (
    <div className="movies">
      <div className="movies__container">
        {/* <div className="movies__search"></div> */}
        <div className="movies__title-wrapper">
          <h3 className="movies__header">trending</h3>
          <div className="movies__stroke"></div>
        </div>
        {/* {sliderLoad}
        {Err}
        {element} */}

        {useMemo(
          () =>
            finiteStateMashine(process, () => (
              <AnimeSlider anime={ratingData} />
            )),
          [ratingData, sliderLoad]
        )}

        <div className="movies__title-wrapper">
          <h3 className="movies__header">movies</h3>
          <div className="movies__stroke"></div>
        </div>

        <Formik
          initialValues={{ year: "2024", category: "adventures" }}
          onSubmit={(values, { resetForm }) => {
            getByYearAnime(values.year, values.category);
            setAllAnimeData([]);
            setOffset(36);
            setDatatipe("yearSearch");
            setsliderLoadToggle(false);
          }}
          validationSchema={validationSchema}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className="movies__filter">
              <div className="movies__input-wrapper">
                <input
                  className="movies__input"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.year}
                  name="year"
                />
                {props.errors.year && (
                  <div className="movies__year-error">{props.errors.year}</div>
                )}
              </div>
              <select
                className="movies__input"
                name="category"
                id="category"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.category}
              >
                <option value="adventures">adventures</option>
                <option value="action">action</option>
                <option value="science">science</option>
                <option value="drama">drama</option>
                <option value="comedy">comedy</option>
                <option value="fantasy">fantasy</option>
              </select>

              <button
                type="submit"
                datatype="yearSearch"
                className="movies__filter-button"
                disabled={loading}
              >
                Filter
              </button>
            </form>
          )}
        </Formik>
        {/* {Load}
        {Err} */}
        {/* {NoElement} */}
        {/* {sliderLoad} */}
        {Load}
        {
          <AnimeList
            relatedData={allAnimeData}
            // Load={Load}
            // Err={Err}
            moviesPage={"moviesPage"}
            setAnimeData={setAnimeData}
            process={process}
          />
        }

        {/* {useMemo(
          () =>
            sliderLoad || (
              <AnimeList
                relatedData={allAnimeData}
                // Load={Load}
                // Err={Err}
                moviesPage={"moviesPage"}
                setAnimeData={setAnimeData}
                process={process}
              />
            ),
          [loadAnime]
        )} */}

        {/* {useMemo(
          () =>
            finiteStateMashine(process, () => (
              <AnimeList
                relatedData={allAnimeData}
                // Load={Load}
                // Err={Err}
                moviesPage={"moviesPage"}
                setAnimeData={setAnimeData}
                process={process}
              />
            )),
          [loadAnime]
        )} */}
        {/* {finiteStateMashine(process, () => (
          <AnimeList
            relatedData={allAnimeData}
            Load={Load}
            Err={Err}
            moviesPage={"moviesPage"}
            setAnimeData={setAnimeData}
            process={process}
          />
        ))} */}

        <button
          className="button movies__button"
          onClick={() => loadAnime(year, offset, category)}
          disabled={loading}
        >
          Next
        </button>
      </div>
      <BtnScrollUp />
    </div>
  );
};

export default MoviesPage;
