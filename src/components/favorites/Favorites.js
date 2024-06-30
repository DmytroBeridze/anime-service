import "./favorites.scss";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const Favorites = ({ data, setFavoritesData, favorites }) => {
  const [active, setActive] = useState(false);
  // const [element, setElement] = useLocalStorage(data.id, active);

  const setData = (id) => {
    setFavoritesData(id);
    setActive(!active);
    !active
      ? window.localStorage.setItem(id, !active)
      : window.localStorage.removeItem(id);
    // window.localStorage.setItem(id, !active);
  };

  useEffect(() => {
    setActive(JSON.parse(window.localStorage.getItem(data)));
  }, []);

  let activeClass = active ? "active" : "";

  return (
    <>
      <div
        className="favorites-btn"
        onClick={() => {
          setData(data);
        }}
      >
        <svg
          className={activeClass}
          fill="#000000"
          width="35px"
          height="35px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>heart</title>
          <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path>
        </svg>
      </div>
    </>
  );
};
// const Favorites = ({ data, setFavoritesData, favorites }) => {
//   const [active, setActive] = useState(false);
//   const [drawing, saveDrawing] = useLocalStorage("drawing", null);
//   const setData = (id) => {
//     setFavoritesData(id);
//     setActive(!active);
//     window.localStorage.setItem(id, !active);
//   };

//   useEffect(() => {
//     setActive(JSON.parse(window.localStorage.getItem(data.id)));
//   }, []);

//   let activeClass = active ? "active" : "";

//   return (
//     <>
//       <div
//         className="favorites-btn"
//         onClick={() => {
//           setData(data.id);
//         }}
//       >
//         <svg
//           className={activeClass}
//           fill="#000000"
//           width="35px"
//           height="35px"
//           viewBox="0 0 32 32"
//           version="1.1"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <title>heart</title>
//           <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path>
//         </svg>
//       </div>
//     </>
//   );
// };

export default Favorites;
