import { AnimeContext } from "../context";
import "./searchMovies.scss";
import { useContext, useEffect, useState } from "react";
import stroke from "../../resources/png/stroke.png";
import sempleImg from "../../resources/img/large.jpg";
import AnimeService from "../services/AnimeService";
import useLocalStorage from "use-local-storage";

const SearchMovies = () => {
  const { getByname, error, loading, clearError } = AnimeService();
  const { anime } = useContext(AnimeContext);
  const [data, setData] = useState([]);
  const [animeName, setAnimeName] = useLocalStorage("animeArr", "");

  const searchAnime = (name) => {
    console.log(name);
    return getByname(name).then((res) => {
      setData(res);
      setAnimeName(res);
      // localStorage.setItem("animeArr", JSON.stringify(res));
    });
  };
  useEffect(() => {
    console.log(anime.length);

    setData(animeName);
    // setData(JSON.parse(localStorage.getItem("animeArr")));
  }, []);

  useEffect(() => {
    if (anime.length > 0) {
      searchAnime(anime);
    }
  }, [anime]);

  if (data.length > 0) {
    return (
      <div className="search-movies">
        <div className="search-movies__container container">
          <section className="search-movies__main">
            <div className="search-movies__info">
              <h1 className="search-movies__title">{data[0].title}</h1>

              {/*----------  info list */}
              <ul className="home-description__info-list">
                <li className="home-description__rating">
                  <span className="">imdb</span>
                  <span className="">8.2</span>
                </li>
                <li className="home-description__year">2021</li>
                <li className="home-description__time">1hour 55minutes</li>
                <li className="home-description__genre">Sci-fi</li>
              </ul>

              {/* ---------movies__description */}
              <div className="search-movies__description">
                {data[0].description}
              </div>
              <button className=" button button_stroke">Watch Trailer</button>
              <button className="button">Episodes</button>
            </div>

            {/* ---------poster */}
            <div className="search-movies__poster">
              <img src={data[0].poster} alt="semple img" />

              <img src={stroke} alt="stroke" />
            </div>
          </section>
          {/* -----------related anime */}
          <section className="search-movies__related-container">
            <div className="search-movies__related">
              <h3 className="search-movies__related-title">related</h3>
              <div className="search-movies__related-stroke"></div>
            </div>
            <ul className="search-movies__galery">
              <li className="search-movies__galery-element">
                <div className="search-movies__galery-img_wrapper">
                  <img src={sempleImg} alt="" />
                </div>
                <div className="search-movies__galery-description">
                  <div className="search-movies__galery-name">Cowboy Bebop</div>
                  <span className="search-movies__galery-year">2024</span>
                  <span className="search-movies__galery-time">104m</span>
                </div>
              </li>
              <li className="search-movies__galery-element">
                <div className="search-movies__galery-img_wrapper">
                  <img src={sempleImg} alt="" />
                </div>
                <div className="search-movies__galery-description">
                  <div className="search-movies__galery-name">Cowboy Bebop</div>
                  <span className="search-movies__galery-year">2024</span>
                  <span className="search-movies__galery-time">104m</span>
                </div>
              </li>
              <li className="search-movies__galery-element">
                <div className="search-movies__galery-img_wrapper">
                  <img src={sempleImg} alt="" />
                </div>
                <div className="search-movies__galery-description">
                  <div className="search-movies__galery-name">Cowboy Bebop</div>
                  <span className="search-movies__galery-year">2024</span>
                  <span className="search-movies__galery-time">104m</span>
                </div>
              </li>
              <li className="search-movies__galery-element">
                <div className="search-movies__galery-img_wrapper">
                  <img src={sempleImg} alt="" />
                </div>
                <div className="search-movies__galery-description">
                  <div className="search-movies__galery-name">Cowboy Bebop</div>
                  <span className="search-movies__galery-year">2024</span>
                  <span className="search-movies__galery-time">104m</span>
                </div>
              </li>
              <li className="search-movies__galery-element">
                <div className="search-movies__galery-img_wrapper">
                  <img src={sempleImg} alt="" />
                </div>
                <div className="search-movies__galery-description">
                  <div className="search-movies__galery-name">Cowboy Bebop</div>
                  <span className="search-movies__galery-year">2024</span>
                  <span className="search-movies__galery-time">104m</span>
                </div>
              </li>
              <li className="search-movies__galery-element">
                <div className="search-movies__galery-img_wrapper">
                  <img src={sempleImg} alt="" />
                </div>
                <div className="search-movies__galery-description">
                  <div className="search-movies__galery-name">Cowboy Bebop</div>
                  <span className="search-movies__galery-year">2024</span>
                  <span className="search-movies__galery-time">4m</span>
                </div>
              </li>
              <li className="search-movies__galery-element">
                <div className="search-movies__galery-img_wrapper">
                  <img src={sempleImg} alt="" />
                </div>
                <div className="search-movies__galery-description">
                  <div className="search-movies__galery-name">Cowboy Bebop</div>
                  <span className="search-movies__galery-year">2024</span>
                  <span className="search-movies__galery-time">104m</span>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    );
  }
};

export default SearchMovies;
