import imgStub from "../../resources/img/130906936alAOy7.png";
import HttpHook from "../../hooks/http.hook";
import { useState } from "react";

const AnimeService = () => {
  const _host = "https://kitsu.io/api/edge";
  const { allElementsResponse, error, loading, clearError } = HttpHook();

  //   ---------get All anime
  const getAllAnime = (limit = 16, offset = 0) => {
    const request = allElementsResponse(
      `${_host}/anime?page[limit]=${limit}&page[offset]=${offset}`
    ).then((resp) => resp.data.map((elem) => transformAnime(elem)));

    return request;
  };
  // -----------get by name
  const getByname = (name) => {
    const request = allElementsResponse(
      `${_host}/anime?filter[text]=${name}`
    ).then((elem) => elem.data.map((elem) => transformAnime(elem)));
    return request;
  };
  // ------------transforn All anime and transform Single anime
  const transformAnime = (elem) => {
    const { id, attributes, relationships } = elem;
    const { canonicalTitle, coverImage, posterImage, description } = attributes;
    const { episodes } = relationships;
    // console.log(episodes);
    return {
      id,
      description,
      title: canonicalTitle,
      episodes: episodes.links.related,
      cover: coverImage === null ? imgStub : coverImage.large,
      poster: posterImage.large,
    };
  };

  return { getAllAnime, getByname, error, loading, clearError };
};

export default AnimeService;
