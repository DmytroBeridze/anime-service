import imgStub from "../../resources/img/130906936alAOy7.png";
import { useState } from "react";
import HttpHook from "../../hooks/http.hook";

const AnimeService = () => {
  const _host = "https://kitsu.io/api/edge";
  const { allElementsResponse, error, loading, clearError } = HttpHook();

  //   ---------get All anime
  const getAllAnime = (limit = 16, offset = 0) => {
    const request = allElementsResponse(
      `${_host}/anime?page[limit]=${limit}&page[offset]=${offset}`
    ).then((resp) => resp.data.map((elem) => transformAllAnime(elem)));

    return request;
  };

  // ------------transforn All anime
  const transformAllAnime = (elem) => {
    // console.log("render");
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

  return { getAllAnime, error, loading, clearError };
};

export default AnimeService;
