import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useCallback, useState } from "react";
import { auth, db, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import useCookieHook from "./cookie.hook";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const useFirebaseHook = () => {
  const [avatars, setAvatars] = useState([]);
  const [success, setSuccess] = useState("");
  const [errorComparison, setErrorComparison] = useState("");
  const { setCookie } = useCookieHook();

  // -----------getting all messages and sorting by create data
  const messagesColection = collection(db, "messages");
  const queryMessages = query(messagesColection, orderBy("createdAt"));
  const [messages, load] = useCollectionData(
    queryMessages,
    orderBy("createdAt")
  );

  // ---------get all avatars
  const loadingAllAvatars = useCallback(async () => {
    const storage = getStorage();
    const avatarsRef = ref(storage, "avatars");

    await listAll(avatarsRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef)
            .then((av) => {
              const forestRef = ref(storage, `avatars/${itemRef.name}`);
              return { forestRef, av };
            })
            // ----getting metadata to determine the type of avatar link
            .then(({ forestRef, av }) => {
              getMetadata(forestRef).then((metadata) => {
                setAvatars((avatars) => [
                  ...avatars,
                  {
                    name: itemRef.name,
                    img: av,
                    dataType: metadata.contentType,
                  },
                ]);
              });
            });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // ----------------singn up
  const register = async (values) => {
    // ----------- adding avatars photo
    const storageRef = ref(storage, `avatars/${values.name}`);
    uploadBytesResumable(storageRef, values.photo);

    await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
      values.name,
      values.photo
    )
      .then((userCredential) => {
        const user = userCredential.user;
        if (values.photo) {
          getDownloadURL(ref(storage, `avatars/${values.name}`)).then(
            (downloadURL) => {
              // -----adding user avatar
              updateProfile(user, {
                photoURL: downloadURL,
              });
            }
          );
        }
        setSuccess(` user ${user.email} is registered :)`);

        // -----adding user name
        updateProfile(user, {
          displayName: values.name,
        });
      })
      .catch((error) =>
        error.message.includes("auth/email-already-in-use")
          ? setErrorComparison("such a user exist")
          : setErrorComparison(error.message)
      );
  };

  // ----------------singn in
  const login = async (values) => {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCookie("userLogin", user.email);
      })
      .catch((error) => setErrorComparison("user does not exist"));
  };

  return {
    loadingAllAvatars,
    avatars,
    messages,
    register,
    success,
    errorComparison,
    setErrorComparison,
    login,
  };
};

export default useFirebaseHook;
