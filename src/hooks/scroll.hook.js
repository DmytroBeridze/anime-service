import { useEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

const config = {
  className: "os-theme-round-dark",
  //   scrollbars: {
  //     visibility: "auto",
  //     autoHide: "leave",
  //   },
};

// const useScrollHook = (ref) => {
//   useEffect(() => {
//     OverlayScrollbars(ref.current, config);
//   }, [ref]);
// };

const useScrollHook = (props) => {
  // console.log(props);
  useEffect(() => {
    for (var i = 0; i < props.length; i++) {
      if (props[i] !== undefined) {
        OverlayScrollbars(props[i], config);
      }
    }
  }, [props]);
};

// -----------------------------------------------
// const useScrollHook = (props) => {
// var instances = OverlayScrollbars(props, {});
// console.log(instances);
// useEffect(() => {
//   for (var i = 0; i < instances.length; i++) {
//     if (instances[i] !== undefined) {
//       OverlayScrollbars(instances[i], config);
//     }
//   }
// }, [props]);
// };

export default useScrollHook;
