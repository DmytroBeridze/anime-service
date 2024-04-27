import { memo, useCallback, useState } from "react";
import imgStub from "../../resources/img/130906936alAOy7.png";
const AnimeService = () => {
  const _host = "https://kitsu.io/api/edge";

  const [loader, setLoader] = useState(null);
  //   ---------get All anime
  const getAllAnime = async (limit = 16, offset = 0) => {
    // console.log("render");
    setLoader(true);

    const request = await fetch(
      `${_host}/anime?page[limit]=${limit}&page[offset]=${offset}`
    );

    const response = await request.json();
    setLoader(false);
    return response.data.map((elem) => transformAllAnime(elem));
  };

  // ------------transforn All anime
  const transformAllAnime = (elem) => {
    console.log("render");
    const { id, attributes } = elem;
    const { canonicalTitle, coverImage, posterImage, description } = attributes;

    return {
      id,
      description,
      title: canonicalTitle,
      cover: coverImage === null ? imgStub : coverImage.large,
      poster: coverImage === null ? imgStub : posterImage.large,
    };
  };

  return { getAllAnime, loader };
};

export default AnimeService;
