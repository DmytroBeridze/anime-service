import { useParams } from "react-router-dom";
import "./singleMovie.scss";
const SingleMovie = ({ Component, setFavoritesData, favorites }) => {
  return (
    <div className="single-movie">
      <Component setFavoritesData={setFavoritesData} favorites={favorites} />
    </div>
  );
};

export default SingleMovie;
