import "./authDetails.scss";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import userIcon from "../../resources/png/user.png";
import useCookieHook from "../../hooks/cookie.hook";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const { removeCookie } = useCookieHook();
  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth)
      .then(() => removeCookie("userLogin"))
      .then(() => navigate("/signin"))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else setAuthUser(null);
    });
    return listen;
  }, []);

  return (
    <>
      {authUser ? (
        <div className="auth">
          <div className="auth__user-mail">{authUser.email}</div>
          <div
            className="auth__user-icon"
            onClick={userSignOut}
            data-tooltip-id="logout-tooltip"
          >
            <img src={userIcon} alt="user" />
          </div>
          <Tooltip
            className=""
            id="logout-tooltip"
            content="logout :("
            place="bottom-end"
          />
        </div>
      ) : (
        <div>logout</div>
      )}
    </>
  );
};

export default AuthDetails;
