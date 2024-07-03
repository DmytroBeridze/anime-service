import "./homePage.scss";
import HomePageBackground from "../../resources/img/HomePageBackground.jpg";
import HomeMainDescription from "../homeMainDescription/HomeMainDescription";
import HomeSlider from "../homeSlider/HomeSlider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useCookieHook from "../../hooks/cookie.hook";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";
import { homePageBackgroundsArray } from "../homePageBackgrounds/homePageBackgrounds.js";
import AnimeService from "../services/AnimeService.js";

const HomePage = () => {
  const { getCookie } = useCookieHook();
  const navigate = useNavigate();
  // const [user, loading, error] = useAuthState(auth);
  const [randomElement, setRandomElement] = useState({});
  const [backroundInfo, setBackgroundInfo] = useState({});
  const { getById, loading } = AnimeService();
  // useEffect(() => {
  //   console.log(user);
  //   if (!user) {
  //     navigate("/signin");
  //   } else navigate("/");
  // }, []);
  const getBackggroundById = (id) => {
    getById(id).then((data) => setBackgroundInfo(data));
  };
  useEffect(() => {
    if (!getCookie("userLogin")) {
      navigate("/signin");
    } else navigate("/");

    randomBackgrounds(homePageBackgroundsArray);
  }, []);

  useEffect(() => {
    if (randomElement.id) {
      getBackggroundById(randomElement.id);
    }
  }, [randomElement]);

  const randomBackgrounds = (arr) => {
    const random = arr[Math.floor(Math.random() * arr.length)];
    setRandomElement(random);
  };

  const Description = !loading ? (
    <HomeMainDescription backroundInfo={backroundInfo} />
  ) : null;
  return (
    <div
      className="homePage"
      style={{
        backgroundImage: `url(${randomElement.poster})`,
      }}
    >
      {Description}
      <HomeSlider />
    </div>
  );
};

export default HomePage;
