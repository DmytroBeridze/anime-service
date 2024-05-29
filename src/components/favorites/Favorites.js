import "./favorites.scss";

const Favorites = ({ data, setFavoritesData, favorites }) => {
  const setData = (id) => {
    setFavoritesData(id);
  };

  return (
    <>
      <div
        className="favorites-btn"
        onClick={() => {
          setData(data.id);
        }}
      ></div>
    </>
  );
};
export default Favorites;
