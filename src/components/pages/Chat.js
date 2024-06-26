import "./chat.scss";

import { useEffect, useRef, useState } from "react";
// --custom scroll
// import "overlayscrollbars/styles/overlayscrollbars.css";
// import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useOverlayScrollbars } from "overlayscrollbars-react";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";
import useFirebaseHook from "../../hooks/firebase.hook.js";

const Chat = () => {
  const [value, setValue] = useState("");
  const [user] = useAuthState(auth);
  const messageRef = useRef();
  const scrollRef = useRef();
  const usersScrollRef = useRef();
  const { loadingAllAvatars, avatars, messages } = useFirebaseHook();
  const events = {
    scroll: () => {
      console.log("Scroll");
    },
  };
  const defer = "defer";
  // const options = { scrollbars: { autoHide: "scroll" } };
  const [initialize, instance] = useOverlayScrollbars({
    // options,
    events,
    defer,
  });

  const [init, inst] = useOverlayScrollbars({
    // options,
    events,
    defer,
  });

  // ---custom scroll
  useEffect(() => {
    initialize(scrollRef.current);
  }, [initialize]);

  useEffect(() => {
    init(usersScrollRef.current);
  }, [init]);

  // ---------get all avatars
  useEffect(() => {
    loadingAllAvatars();
  }, []);

  // ---------прокрутка до останнього повідомлення
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages, avatars]);

  const sendMessage = async () => {
    try {
      const docMess = await addDoc(collection(db, "messages"), {
        userId: user.uid,
        userName: user.displayName,
        userImail: user.email,
        userPhoto: user.photoURL,
        userMessage: value,
        createdAt: serverTimestamp(),
      });

      setValue("");
      console.log("Document written with ID: ", docMess.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const disabledBtn = value.length > 0 ? false : true;

  const element = messages?.map((mess) => {
    const activeClass = mess.userId === user.uid ? "sended" : "received";
    return (
      <div className={`chat__message-container  ${activeClass}`}>
        <div className={`chat__message  ${activeClass}`} ref={messageRef}>
          {activeClass === "received" && <div>{mess.userName}</div>}
          <div className="chat__text">{mess.userMessage} </div>
        </div>

        {mess.userPhoto ? (
          <div className={`chat__user-photo ${activeClass}`}>
            <img src={mess.userPhoto} alt="user photo" />
          </div>
        ) : (
          <div className="chat__user-photo without-av">
            <p>{mess.userName[0]}</p>
          </div>
        )}
      </div>
    );
  });
  return (
    <div className="chat">
      <div className="chat__container">
        <div className="favorites__title-wrapper">
          <h3 className="favorites__header">anime chat</h3>
          <div className="favorites__stroke"></div>
        </div>
        <div className="chat__messages-wrapper">
          {/* ----------------------Avatars scroll ----------------------------------- */}
          <div
            className=" chat__avatars-wrapper scroll-wrapper"
            ref={scrollRef}
          >
            <div className="chat__awatarts-container">
              {avatars.map((elem) => {
                return (
                  <div className="chat__avatar ">
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
              })}
            </div>
          </div>
          <div className="">
            {/* ----------------------Chat scroll wrapper----------------------------------- */}
            <div
              className="chat__scroll-wrapper scroll-wrapper"
              ref={usersScrollRef}
            >
              <div className="chat__messages">{element}</div>
            </div>

            <textarea
              type="text"
              className="chat__write-message"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="message"
            />
          </div>
        </div>
        <button
          className="chat__send button"
          disabled={disabledBtn}
          onClick={sendMessage}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
