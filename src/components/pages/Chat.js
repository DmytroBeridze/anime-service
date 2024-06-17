import "./chat.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";
import { useCollectionData } from "react-firebase-hooks/firestore";

// import "overlayscrollbars/overlayscrollbars.css";
import "overlayscrollbars/styles/overlayscrollbars.css";

// ----------firebase get all avatars import
import {
  getDownloadURL,
  getStorage,
  getMetadata,
  listAll,
  ref,
} from "firebase/storage";

import useScrollHook from "../../hooks/scroll.hook.js";

const Chat = () => {
  const [value, setValue] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [user] = useAuthState(auth);
  const messageRef = useRef();
  const scrollRef = useRef();
  const usersScrollRef = useRef();

  // ------------custom scroll
  // useScrollHook([scrollRef.current, usersScrollRef.current]);
  useScrollHook(scrollRef);
  useScrollHook(usersScrollRef);
  //
  // ---------get all avatars
  const loadingAllAvatars = useCallback(() => {
    const storage = getStorage();
    const avatarsRef = ref(storage, "avatars");
    listAll(avatarsRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((av) => {
            const forestRef = ref(storage, `avatars/${itemRef.name}`);

            // ----отримання метаданих для визначення типу посилання на аватарку
            getMetadata(forestRef).then((metadata) => {
              setAvatars((avatars) => [
                ...avatars,
                { name: itemRef.name, img: av, dataType: metadata.contentType },
              ]);
            });
          });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    loadingAllAvatars();
  }, []);

  // ---------отримання всіх повідомлень і сортування за датою створення
  const messagesColection = collection(db, "messages");
  const queryMessages = query(messagesColection, orderBy("createdAt"));
  const [messages, load] = useCollectionData(
    queryMessages,
    orderBy("createdAt")
  );
  // ---------прокрутка до останнього повідомлення
  // console.log(messages);
  useEffect(() => {
    // console.log(messageRef.current);
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages, avatars]);
  // const getRef = (ref) => {
  //   setHeightField(ref);

  // ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
  // };
  // useEffect(() => {
  //   console.log("!!");
  //   heightField.current.scrollIntoView({ behavior: "smooth", block: "end" });
  // }, [heightField]);
  // const messageField = useRef(null);

  //? ---------отримання всіх повідомлень і сортування за датою створення
  // const [messages, loading, error] = useCollectionData(
  //   collection(db, "messages"),
  //   orderBy("createdAt")

  // -------------------або так  (в чому різниця?)
  // collection(getFirestore(), "messages")
  // );

  // const messagesColection = collection(db, "messages");
  // const queryMessages = query(messagesColection, orderBy("createdAt"));
  // const [messages, loading] = useCollectionData(
  //   messagesColection,
  //   orderBy("createdAt")
  // );

  // const messagesColection = collection(db, "messages");
  // const queryMessages = query(messagesColection, orderBy("createdAt"));
  // const [messages, loading] = query(
  //   useCollectionData(queryMessages, orderBy("createdAt"))
  // );

  const sendMessage = async () => {
    // heightField.scrollIntoView({ behavior: "smooth", block: "end" });
    // messageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    try {
      const docMess = await addDoc(collection(db, "messages"), {
        userId: user.uid,
        userName: user.displayName,
        userImail: user.email,
        userPhoto: user.photoURL,
        userMessage: value,
        createdAt: serverTimestamp(),
      });

      // messageField.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setValue("");
      console.log("Document written with ID: ", docMess.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  // ---------отримання всіх повідомлень і сортування за датою створення
  //! ------робочий варіант!!!
  // const messagesColection = collection(db, "messages");
  // const queryMessages = query(messagesColection, orderBy("createdAt"));
  // const [messages, load] = useCollectionData(
  //   queryMessages,
  //   orderBy("createdAt")
  // );

  //! ---------варіант отримання даних з документації

  // const getMessage = async () => {
  //   const querySnapshot = await getDocs(collection(db, "messages"),orderBy("createdAt"));
  //   querySnapshot.forEach((doc) => {
  //     const { userImail, userMessage } = doc.data();
  //     console.log(doc.data());
  //   });
  // };

  // !---------варіант отримання даних без хука useCollectionData
  // const moviesCollect = collection(db, "messages");
  // const getMovieList = async () => {
  //   const data = await getDocs(moviesCollect, orderBy("userMessage"));
  //   const filterData = data.docs.map((doc) => {
  //     return {
  //       ...doc.data(),
  //     };
  //   });
  //   console.log(filterData);
  // };

  // useEffect(() => {
  //   getMovieList();
  // }, []);

  // const Wiev = () => {
  //   if (messages) {
  //     // const result = messages.sort(
  //     //   (a, b) => a.createdAt.seconds - b.createdAt.seconds
  //     // );

  //     return result.map((mess) => (
  //       <>
  //         <div key={mess.userMessage} style={{ color: "black" }}>
  //           {mess.userMessage}
  //         </div>
  //         <div style={{ color: "black" }}>{mess.userName}</div>
  //       </>
  //     ));
  //   }
  // };

  // ---------прокрутка до останнього повідомлення

  // useEffect(() => {
  //   if (messageField.current) {
  //     messageField.current.scrollIntoView({ behavior: "smooth", block: "end" });
  //   }
  // }, []);

  // console.log(messageField.current.pageYOffset);

  // const heightField = messageField.current.scrollHeight;
  // useEffect(() => {
  //   messageField.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "end",
  //     inline: "end",
  //   });
  // }, [messages]);
  // !----------------------------------------------------------
  const disabledBtn = value.length > 0 ? false : true;
  // const element = messages?.map((mess) => (
  //   <Wiev mess={mess} key={mess.userMessage} user={user} getRef={getRef} />
  // ));

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
            className="chat__scroll-wrapper"
            ref={usersScrollRef}
            style={{ height: "690px", background: "transparent" }}
          >
            <div className="chat__avatars-wrapper">
              {avatars.map((elem) => {
                return (
                  <div className="chat__avatar">
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
          <div>
            {/* ----------------------Chat scroll wrapper----------------------------------- */}
            <div className="chat__scroll-wrapper" ref={scrollRef}>
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

// const Wiev = ({ mess, user, getRef }) => {
//   const messageRef = useRef();
//   useEffect(() => {
//     // console.log(messageRef.current);
//     messageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//   }, []);
//   getRef(messageRef);

//   const activeClass = mess.userId === user.uid ? "sended" : "received";
//   return (
//     <div className={`chat__message-container  ${activeClass}`}>
//       <div className={`chat__message  ${activeClass}`} ref={messageRef}>
//         {activeClass === "received" && <div>{mess.userName}</div>}
//         <div className="chat__text">{mess.userMessage} </div>
//       </div>
//       <div className={`chat__user-photo ${activeClass}`}>
//         <img src={mess.userPhoto} alt="user photo" />
//       </div>
//     </div>
//   );
// };

export default Chat;
