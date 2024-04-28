import { useState } from "react";
import "./loadableImage.scss";
import { useRef } from "react";
import { useEffect } from "react";

const LoadableImage = ({ src, alt }) => {
  const [load, setLoad] = useState(true);
  const loadRef = useRef(null);
  useEffect(() => {
    if (loadRef.current) {
      loadRef.current.onload = () => setLoad(false);
    }
  }, []);
  return (
    <div className="load-container">
      <img
        ref={loadRef}
        src={src}
        alt={alt}
        className={load ? "load-image" : "load-image__loaded"}
      />
    </div>
  );
};
export default LoadableImage;
