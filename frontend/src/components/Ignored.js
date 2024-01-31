import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Ignored = () => {
  const [ignored, setIgnored] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("token");

    axios
      .get(`http://localhost:3000/api/users/${userId}/ignored`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIgnored(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ignored list:", error.message);
        setError(error.message);
      });
  }, []);

  return (
    <div className="anime-list-container">
      <h2 className="list-title">Ignored</h2>
      {error ? (
        <p className="error-message">Error fetching ignored list: {error}</p>
      ) : (
        <ul className="anime-list">
          {ignored.map((anime) => (
            <li key={anime._id} className="anime-item">
              <Link to={`/anime/${anime._id}`} className="anime-link">
                {anime.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Ignored;
