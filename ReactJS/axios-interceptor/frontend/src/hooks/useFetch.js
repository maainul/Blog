import { useEffect, useState } from "react";


const useFetch = (apiFunction, params = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null)

    const fetchData = async () => {
      try {
        console.log("⏳ Fetching data...");
        const result = await apiFunction(...params, { signal })
        setData(result);
      } catch (error) {
        if (error.name === "CanceledError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort()
    }

  }, [apiFunction, ...params]);

  return { data, loading, error };
};

export default useFetch;
