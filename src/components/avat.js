import React, { memo } from "react";

const Avat = ({ avatars }) => {
  return avatars?.map((elem) => {
    return (
      <div className="chat__avatar " key={elem.name}>
        {elem.dataType === "image/jpeg" ? (
          <div className="chat__avatar-img">
            <img src={elem.img} alt="user" />
          </div>
        ) : (
          <div className="chat__no-avatar">
            <p>{elem.name[0]}</p>
          </div>
        )}
        <div className="chat__avatar-name">{elem.name}</div>
      </div>
    );
  });
};

export default memo(Avat);
