import "./btnScrollUp.scss";
import { useEffect, useRef } from "react";
import arrowDown from "../../resources/png/arrow-up.png";

const BtnScrollUp = () => {
  const buttonRef = useRef(null);
  const pageUp = () => {
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
        <img src={arrowDown} alt="arrow up" />
      </button>
    </div>
  );
};

export default BtnScrollUp;
