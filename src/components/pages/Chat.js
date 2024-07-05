import "./chat.scss";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useOverlayScrollbars } from "overlayscrollbars-react";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";
import useFirebaseHook from "../../hooks/firebase.hook.js";
import { AnimeContext } from "../context.js";

const Chat = () => {
  const [value, setValue] = useState("");
  const [user] = useAuthState(auth);
  const messageRef = useRef();
  const scrollRef = useRef();
  const usersScrollRef = useRef();
  const { loadingAllAvatars, avatars, messages } = useFirebaseHook();

  // -------показує відкрите чи закрите бургер меню
  const { addPadding } = useContext(AnimeContext);

  // ---------custom scroll init
  const events = {
    scroll: (e) => {},
  };
  const defer = "defer";
  const options = {
    // scrollbars: { autoHide: "scroll" },
    className: "os-theme-dark",
  };

  const [initialize, instance] = useOverlayScrollbars({
    options,
    events,
    defer,
  });

  const [init, inst] = useOverlayScrollbars({
    options,
    events,
    defer,
  });

  // ---custom scroll
  useEffect(() => {
    init(usersScrollRef.current);
  }, [init]);

  // ---------get all avatars
  useEffect(() => {
    loadingAllAvatars();
  }, []);

  // ---------прокрутка до останнього повідомлення
  const scrollToLast = () => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToLast();
      initialize(scrollRef.current);
    }, 500);
  }, [messages]);

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
  const messagesElement = useMemo(
    () =>
      messages?.map((mess, i) => {
        const activeClass = mess.userId === user.uid ? "sended" : "received";
        return (
          <div className={`chat__message-container  ${activeClass}`} key={i}>
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
      }),
    [messages]
  );

  const avatarsElement = useMemo(
    () =>
      avatars?.map((elem) => {
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
      }),
    [avatars]
  );
  // const togglePadding = addPadding ? "chat__decor active" : "chat__decor";
  return (
    <div className="chat">
      {/* <div className="chat__decor"></div> */}
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
            // key={}
          >
            <div className="chat__awatarts-container">{avatarsElement}</div>
          </div>
          <div>
            {/* ----------------------Chat scroll wrapper----------------------------------- */}

            <div
              className="chat__scroll-wrapper scroll-wrapper"
              ref={usersScrollRef}
              id="chatId"
            >
              <div className="chat__messages">{messagesElement}</div>
            </div>

            <textarea
              type="text"
              className="chat__write-message"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="message"
              // onScroll={(event) => scrollTrain(event.target)}
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
