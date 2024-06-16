import { OverlayScrollbars } from "overlayscrollbars";
import { useEffect } from "react";

const config = {
  className: "os-theme-round-dark",
  //   scrollbars: {
  //     visibility: "auto",
  //     autoHide: "leave",
  //   },
};
const useScrollHook = (ref) => {
  useEffect(() => {
    if (ref.current) {
      OverlayScrollbars(ref.current, config);
    }
  }, [ref]);
};

export default useScrollHook;
