import "./homePage.scss";
import HomePageBackground from "../../resources/img/HomePageBackground.jpg";
import HomeMainDescription from "../homeMainDescription/HomeMainDescription";
import HomeSlider from "../homeSlider/HomeSlider";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
const HomePage = () => {
  return (
    <div
      className="homePage"
      style={{
        backgroundImage: `url(${HomePageBackground})`,
      }}
    >
      <HomeMainDescription />
      <HomeSlider />
    </div>
  );
};

export default HomePage;
