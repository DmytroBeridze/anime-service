import imgStub from "../../resources/img/130906936alAOy7.png";
import HttpHook from "../../hooks/http.hook";

const AnimeService = () => {
  const _host = "https://kitsu.io/api/edge";
  const {
    allElementsResponse,
    error,
    loading,
    clearError,
    process,
    setProcess,
  } = HttpHook();

  //   ---------get All anime
  const getAllAnime = (limit = 16, offset = 0) => {
    const request = allElementsResponse(
      `${_host}/anime?page[limit]=${limit}&page[offset]=${offset}`
    ).then((resp) => resp.data.map((elem) => transformAnime(elem)));

    return request;
  };

  // -----------get by name
  const getByname = (name) => {
    console.log(name);
    const request = allElementsResponse(
      `${_host}/anime?filter[text]=${name}`
    ).then((elem) => elem.data.map((elem) => transformAnime(elem)));
    return request;
  };

  // -----------get by id
  const getById = (id) => {
    const request = allElementsResponse(`${_host}/anime/${id}`).then((elem) =>
      transformAnime(elem.data)
    );
    return request;
  };
  // ------------get episodes by id
  const getEpisodesById = (id) => {
    // console.log(id);
    const request = allElementsResponse(
      `https://kitsu.io/api/edge/anime/${id}/episodes`
    ).then((elem) => elem.data.map((elem) => transformEpisodes(elem)));
    return request;
  };

  // -----------get trending anime
  const getTrandingAnime = () => {
    const request = allElementsResponse(`${_host}/trending/anime`).then(
      (elem) => elem.data.map((elem) => transformAnime(elem))
    );
    return request;
  };

  // -------------get by year and date
  const getByYear = (seasonYear = null, offset = 0, categories) => {
    const request = allElementsResponse(
      `${_host}/anime?filter[categories]=${categories}&filter[seasonYear]=${seasonYear}&page[limit]=18&page[offset]=${offset}`
    ).then((elem) => elem.data.map((elem) => transformAnime(elem)));
    return request;
  };

  // -------------get single episode
  const getEpisode = (id) => {
    const request = allElementsResponse(
      `https://kitsu.io/api/edge/episodes/${id}`
    ).then((res) => transformEpisodes(res.data));
    return request;
  };

  // ------------transform anime
  const transformAnime = (elem) => {
    const { id, attributes, relationships } = elem;
    const {
      canonicalTitle,
      coverImage,
      posterImage,
      description,
      ratingRank,
      startDate,
      ageRatingGuide,
      showType,
      youtubeVideoId,
    } = attributes;
    const { episodes } = relationships;
    return {
      id,
      description,
      ratingRank: ratingRank || "----",
      startDate: startDate ? startDate.slice(0, 4) : "----",
      youtubeVideoId,
      ageRatingGuide: ageRatingGuide || "----",
      showType: showType || "----",
      title: canonicalTitle || "----",
      episodes: episodes.links.related,
      cover: coverImage === null ? imgStub : coverImage.large,
      poster: posterImage.large,
    };
  };

  // ------------transform episodes
  const transformEpisodes = (elem) => {
    const { id, attributes, relationships, type } = elem;
    const {
      canonicalTitle,
      description,
      thumbnail,
      length,
      airdate,
      seasonNumber,
    } = attributes;

    return {
      id,
      title: canonicalTitle || "---",
      description,
      // description: description || "---",
      thumbnail,
      length: length || "---",
      airdate: airdate || "---",
      seasonNumber: seasonNumber || "---",
      relationships,
      type,
    };
  };

  return {
    getAllAnime,
    getByname,
    getById,
    getEpisodesById,
    getTrandingAnime,
    getByYear,
    getEpisode,

    error,
    loading,
    clearError,
    process,
    setProcess,
  };
};

export default AnimeService;
