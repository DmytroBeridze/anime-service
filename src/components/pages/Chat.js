import "./chat.scss";
import { useEffect, useState } from "react";
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

const Chat = () => {
  const [value, setValue] = useState("");
  const [user] = useAuthState(auth);
  console.log(user);
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
    try {
      const docMess = await addDoc(collection(db, "messages"), {
        userId: user.uid,
        userName: user.displayName,
        userImail: user.email,
        userPhoto: user.photoURL,
        userMessage: value,
        createdAt: serverTimestamp(),
        // userTime: user.FieldValue.serverTimestamp(),
      });
      setValue("");
      console.log("Document written with ID: ", docMess.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //! ------робочий варіант!!!

  const messagesColection = collection(db, "messages");
  const queryMessages = query(messagesColection, orderBy("createdAt"));
  const [messages, load] = useCollectionData(
    queryMessages,
    orderBy("createdAt")
  );

  // console.log(messages);
  // ---------варіант отримання даних з документації

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

  const Element = messages?.map((mess) => (
    <Wiev mess={mess} key={mess.userMessage} user={user} />
  ));

  return (
    <div className="chat">
      <div className="chat__container">
        <div className="favorites__title-wrapper">
          <h3 className="favorites__header">anime chat</h3>
          <div className="favorites__stroke"></div>
        </div>
        <div className="chat__messages">{Element}</div>
        <textarea
          type="text"
          className="chat__write-message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="chat__send button" onClick={sendMessage}>
          send
        </button>
      </div>
    </div>
  );
};

const Wiev = ({ mess, user }) => {
  const activeClass = mess.userId === user.uid ? "sended" : "received";
  return (
    <div className={`chat__message  ${activeClass}`}>
      <div style={{ color: "black" }}>{mess.userMessage}</div>
      <div style={{ color: "black" }}>{mess.userName}</div>
      <img src={mess.userPhoto} alt="user photo" />
    </div>
  );
};

export default Chat;
