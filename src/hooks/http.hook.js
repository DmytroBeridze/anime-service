import { useState } from "react";

const HttpHook = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState("waiting");

  // -------------------------all elements
  const allElementsResponse = async (
    url,
    method = "GET",
    headers = { "Content-type": "application/json" },
    body = null
  ) => {
    try {
      setProcess("loading");
      setLoading(true);
      const request = await fetch(url, { method, headers, body });
      if (request.ok) {
        const response = await request.json();
        setProcess("ready");
        setLoading(false);
        return response;
      } else throw new Error("Failed request");
    } catch (error) {
      setProcess("error");
      setLoading(false);
      setError(error.message);
      console.log(error.message);
      throw error;
    }
  };
  const clearError = () => setError(false);
  return {
    allElementsResponse,
    error,
    loading,
    clearError,
    process,
    setProcess,
  };
};

export default HttpHook;
