import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import userIcon from "../../resources/png/user.png";
import useCookieHook from "../../hooks/cookie.hook";
import { useNavigate } from "react-router-dom";

const AuthDetales = ({ userLoginData }) => {
  const [authUser, setAuthUser] = useState(null);
  const { removeCookie } = useCookieHook();
  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth)
      .then(() => removeCookie("userLogin"))
      // .then(() => navigate("/signin"))
      // .then(() => window.location.reload())
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else setAuthUser(null);
    });
    userLoginData(authUser);
    return listen;
  }, []);

  // console.log(authUser);
  return (
    <>
      {authUser ? (
        <div className="header-nav__user">
          <div className="header-nav__user-mail">{authUser.email}</div>
          <div className="header-nav__user-icon" onClick={userSignOut}>
            <img src={userIcon} alt="user" />
          </div>
        </div>
      ) : (
        <div>logout</div>
      )}
    </>
  );
};

export default AuthDetales;
