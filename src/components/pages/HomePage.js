import "./homePage.scss";
import HomePageBackground from "../../resources/img/HomePageBackground.jpg";
import HomeMainDescription from "../homeMainDescription/HomeMainDescription";
import HomeSlider from "../homeSlider/HomeSlider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useCookieHook from "../../hooks/cookie.hook";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";

const HomePage = ({ userLogin }) => {
  const { getCookie } = useCookieHook();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  // console.log(user);
  // useEffect(() => {
  //   console.log(user);
  //   if (!user) {
  //     navigate("/signin");
  //   } else navigate("/");
  // }, []);
  useEffect(() => {
    if (!getCookie("userLogin")) {
      navigate("/signin");
    } else navigate("/");
  }, []);

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
