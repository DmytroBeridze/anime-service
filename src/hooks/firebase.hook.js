import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
} from "firebase/storage";
import { useCallback, useState } from "react";

const useFirebaseHook = () => {
  const [avatars, setAvatars] = useState([]);

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
  return { loadingAllAvatars, avatars };
};

export default useFirebaseHook;
