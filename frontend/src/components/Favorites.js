import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("token");

    axios
      .get(`http://localhost:3000/api/users/${userId}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error.message);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h2>Favorites</h2>
      {error ? (
        <p>Error fetching favorites: {error}</p>
      ) : (
        <ul>
          {favorites.map((anime) => (
            <li key={anime._id}>
              <Link to={`/anime/${anime._id}`}>{anime.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
