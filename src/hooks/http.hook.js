import { useState } from "react";

const HttpHook = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // -------------------------all elements
  const allElementsResponse = async (
    url,
    method = "GET",
    headers = { "Content-type": "application/json" },
    body = null
  ) => {
    try {
      setLoading(true);
      const request = await fetch(url, { method, headers, body });
      if (request.ok) {
        const response = await request.json();
        setLoading(false);
        return response;
      } else throw new Error("Failed request");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error.message);
      throw error;
    }
  };
  const clearError = () => setError(false);
  return { allElementsResponse, error, loading, clearError };
};

export default HttpHook;
