import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/anime/search?title=${searchTitle}`
        );
        setAnimeList(response.data);
      } catch (error) {
        console.error("Błąd pobierania listy anime:", error.message);
      }
    };

    fetchAnimeList();
  }, [searchTitle]);

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };

  return (
    <div className="anime-list-container">
      <h2 className="list-title">Lista Anime</h2>
      <input
        type="text"
        placeholder="Wyszukaj według tytułu"
        value={searchTitle}
        onChange={handleSearchChange}
        className="search-input"
      />
      <ul className="anime-list">
        {animeList.map((anime) => (
          <li key={anime._id} className="anime-item">
            <Link to={`/anime/${anime._id}`} className="anime-link">
              {anime.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeList;
