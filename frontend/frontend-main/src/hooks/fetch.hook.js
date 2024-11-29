import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:3001";

export default function useFetch(query) {
  const [data, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, isLoading: true }));

      try {
        console.log("Fetching data for query:", query);
        const response = await axios.get(`/api${query}`);

        setData({
          isLoading: false,
          apiData: response.data,
          status: response.status,
          serverError: null,
        });

        console.log("API Response Status:", response.status);
        console.log("API Response Data:", response.data);
      } catch (error) {
        setData({
          isLoading: false,
          apiData: undefined,
          status: null,
          serverError: error,
        });

        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query]);

  return [data, setData];
}
