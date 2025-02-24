import { useEffect, useState } from "react";


const useFetch = (apiFunction, params = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log("🚀 Initial loading state:", loading);

  useEffect(() => {
    console.log("⚡ Setting loading to true...");
    setLoading(true);
    setError(null)
    const fetchData = async () => {
      try {
        console.log("⏳ Fetching data...");
        const result = await apiFunction(...params)
        setData(result);
        console.log("✅ Data fetched successfully!");
      } catch (error) {
        setError(error.message);
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
        console.log("🔄 Loading set to false");
      }
    };
    fetchData();

  }, [apiFunction, ...params]);

  return { data, loading, error };
};

export default useFetch;
