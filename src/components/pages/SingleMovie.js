import { useParams } from "react-router-dom";
import "./singleMovie.scss";
const SingleMovie = ({ Component }) => {
  return (
    <div className="single-movie">
      <Component />
    </div>
  );
};

export default SingleMovie;
