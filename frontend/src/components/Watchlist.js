import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { handleRemoveFromWatchlist } from "./AddToLists";
import "../styles/styles.css";

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
    setWatchlist((prevList) =>
      prevList.filter((anime) => anime._id !== animeId)
    );
  };

  return (
    <div className="anime-list-container">
      <h2 className="list-title">Watchlist</h2>
      {error ? (
        <p className="error-message">Error fetching watchlist: {error}</p>
      ) : (
        <ul className="anime-list">
          {watchlist.map((anime) => (
            <li key={anime._id} className="anime-item">
              <Link to={`/anime/${anime._id}`} className="anime-link">
                {anime.title}
              </Link>
              <button
                onClick={() => removeFromWatchlist(anime._id)}
                className="remove-button"
              >
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
