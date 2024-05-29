import "./btnScrollUp.scss";
import { useEffect, useRef, useState } from "react";

const BtnScrollUp = () => {
  const buttonRef = useRef(null);
  //   const [show, setShow] = useState(false);
  const pageUp = () => {
    // window.scrollTo(0, 520);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        if (window.scrollY > 1500) {
          buttonRef.current.classList.add("show");
        } else buttonRef.current.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scrollUp__container">
      <button className="scrollUp" onClick={pageUp} ref={buttonRef}>
        Up
      </button>
    </div>
  );
};

export default BtnScrollUp;
