import "./homePage.scss";
import HomePageBackground from "../../resources/img/HomePageBackground.jpg";
import HomeMainDescription from "../homeMainDescription/HomeMainDescription";
import HomeSlider from "../homeSlider/HomeSlider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useCookieHook from "../../hooks/cookie.hook";

const HomePage = ({ userLogin }) => {
  const { getCookie } = useCookieHook();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCookie("userLogin")) {
      navigate("/signin");
    } else navigate("/");
  }, []);

  // useEffect(() => {
  //   if (!userLogin) {
  //     navigate("/signin");
  //   } else navigate("/");
  // }, []);

  return (
    <>
      <div
        className="homePage"
        style={{
          backgroundImage: `url(${HomePageBackground})`,
        }}
      >
        <HomeMainDescription />
        <HomeSlider />
      </div>
    </>
  );
};

export default HomePage;
