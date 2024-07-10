import Cookies from "js-cookie";

const useCookieHook = () => {
  const getCookie = (name) => {
    return Cookies.get(name);
  };

  const setCookie = (name, value) => {
    Cookies.set(name, value, { expires: 1, path: "/" });
  };

  const removeCookie = (name) => {
    Cookies.remove(name);
  };

  return { getCookie, setCookie, removeCookie };
};
export default useCookieHook;
