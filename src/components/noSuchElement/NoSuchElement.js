import { useEffect, useState } from "react";
import "./noSuchElement.scss";

const NoSuchElement = () => {
  const [exclam, setExclam] = useState(true);

  return (
    <div className="noSuchElement">
      <div>
        <h2>No Such Element</h2>
      </div>
      <div className="te">
        <h2 className="exclam">!</h2>
      </div>
    </div>
  );
};
export default NoSuchElement;
