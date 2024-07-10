import "./uploader.scss";
import React, { useState } from "react";
import trash from "../../resources/png/trash.png";

const Uploader = ({ props }) => {
  const [avatar, setAvatar] = useState(null);
  const [fileName, setFileName] = useState("no selected file");

  return (
    <div className="uoloader-container">
      <input
        id="avatar-photo"
        type="file"
        onBlur={props.handleBlur}
        name="photo"
        placeholder="add photo"
        onChange={(event) => {
          props.setFieldValue("photo", event.currentTarget.files[0]);
          event.currentTarget.files[0] &&
            setFileName(event.currentTarget.files[0].name);
          if (event.currentTarget.files[0]) {
            setAvatar(URL.createObjectURL(event.currentTarget.files[0]));
          }
        }}
      />
      <label htmlFor="avatar-photo" className="button button_stroke">
        add photo
      </label>
      {avatar ? (
        <div>
          <img className="avatar-preview" src={avatar} alt={fileName}></img>
          <img
            className="avatar-close"
            src={trash}
            onClick={() => {
              setFileName("no selected file");
              setAvatar(null);
            }}
          ></img>
        </div>
      ) : (
        <div>{fileName}</div>
      )}
    </div>
  );
};

export default Uploader;
