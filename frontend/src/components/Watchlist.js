// Watchlist.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { handleRemoveFromWatchlist } from "./AddToLists"; // Import funkcji do usuwania z listy

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("token");

    axios
      .get(`http://localhost:3000/api/users/${userId}/watchlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setWatchlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching watchlist:", error.message);
        setError(error.message);
      });
  }, []);

  const removeFromWatchlist = async (animeId) => {
    await handleRemoveFromWatchlist(animeId);
    // Aktualizacja lokalnej listy po usunięciu z bazy danych
    setWatchlist((prevList) =>
      prevList.filter((anime) => anime._id !== animeId)
    );
  };

  return (
    <div>
      <h2>Watchlist</h2>
      {error ? (
        <p>Error fetching watchlist: {error}</p>
      ) : (
        <ul>
          {watchlist.map((anime) => (
            <li key={anime._id}>
              <Link to={`/anime/${anime._id}`}>{anime.title}</Link>
              <button onClick={() => removeFromWatchlist(anime._id)}>
                Remove from List
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;
