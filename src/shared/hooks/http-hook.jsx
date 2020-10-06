import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpclient = () => {
  const [isLoading, setisLoading] = useState(false),
    [error, setError] = useState();

  const activehttpRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setisLoading(true);
      const httpAbort = new AbortController();
      activehttpRequest.current.push(httpAbort);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbort.signal,
        });

        const data = await response.json();

        activehttpRequest.current = activehttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbort
        );
        setisLoading(false);
        if (!response.ok) {
          throw new Error(data.message);
        }
        return data;
      } catch (error) {
        console.log(error);
        setError(error.message);
        setisLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activehttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
