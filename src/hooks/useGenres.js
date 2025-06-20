import axios from "axios";
import { useEffect, useState } from "react";

export default function UseGenres() {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/movie/genres`
        );
        setGenres(res.data);
      } catch (error) {
        // Handle error appropriately
        setError("Failed to load genres");
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return { genres, error };
}
