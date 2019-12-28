import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useData(initialQuery, initialState=null) {
  const [data, setData] = useState(initialState);
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (query === null) return;

    // set and clear flags
    setIsLoading(true);
    setIsError(false);
    axios.get(query)
      .then(({ data }) => {
        if (!isCancelled) {
          setData(data.data);
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));

    return () => {
      // clear flags
      setIsLoading(false);
      setIsError(false);
      // *cancel* the HTTP request
      setIsCancelled(true);
    };
  }, [query]);

  const execQuery = (string) => setQuery(string);

  const overrideData = (newData) => {
    query = null;
    setData(newData);
  };

  return [{ data, isLoading, isError, overrideData }, execQuery];
}