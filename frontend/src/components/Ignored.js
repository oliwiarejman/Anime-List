import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div>
      <h2>Ignored</h2>
      {error ? (
        <p>Error fetching ignored list: {error}</p>
      ) : (
        <ul>
          {ignored.map((anime) => (
            <li key={anime._id}>
              <Link to={`/anime/${anime._id}`}>{anime.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Ignored;
