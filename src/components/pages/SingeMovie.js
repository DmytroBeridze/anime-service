import { AnimeContext } from "../context";
import "./singeMovie.scss";
import { useContext } from "react";
const SingeMovie = () => {
  const { anime } = useContext(AnimeContext);
  // console.log(anime);
  return <div className="single-movie"></div>;
};

export default SingeMovie;
