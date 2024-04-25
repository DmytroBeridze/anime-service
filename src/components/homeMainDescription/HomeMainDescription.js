import "./homeMainDescription.scss";

const HomeMainDescription = () => {
  return (
    <div className="home-description">
      <h1 className="home-description__title">Spider man No Way Home</h1>
      <div className="home-description__info">
        <ul className="home-description__info-list">
          <li className="home-description__rating">
            <span className="">imdb</span>
            <span className="">8.2</span>
          </li>
          <li className="home-description__year">2021</li>
          <li className="home-description__time">1hour 55minutes</li>
          <li className="home-description__genre">Sci-fi</li>
        </ul>
        <div className="home-description__text">
          <span>
            Scelerisque sed ultricies tristique. Mi in vivamus aliquam varius eu
            felis. Id ultricies diam turpis mi tincidunt. Ut morbi sed urna
            tempor imperdiet eu scelerisque egestas. Interdum mi orci
            suspendisse in s...
            <span className="home-description__see-more">See more...</span>
          </span>
        </div>

        <button className="button button_stroke">Watch Trailer</button>
        <button className="button">Watch Now</button>
      </div>
    </div>
  );
};
export default HomeMainDescription;
