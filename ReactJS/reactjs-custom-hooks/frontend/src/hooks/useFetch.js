import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log("🚀 Initial loading state:", loading);

  useEffect(() => {
    // console.log("⚡ Setting loading to true...");
    setLoading(true); // Ensure loading starts as true
    setError(null)
    const fetchData = async () => {
      try {
        // console.log("⏳ Fetching data...");
        const result = await axios.get(URL)
        setData(result.data.data);
        // console.log("✅ Data fetched successfully!");
      } catch (error) {
        setError(error.message);
        // console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
        // console.log("🔄 Loading set to false");
      }
    };
    fetchData();

  }, [URL]);

  return { data, loading, error };
};

export default useFetch;
