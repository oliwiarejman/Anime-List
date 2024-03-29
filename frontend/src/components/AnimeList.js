import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/anime/search?title=${searchTitle}&genre=${searchGenre}&sortOrder=${sortOrder}&page=${page}`
        );
        setAnimeList(response.data);
      } catch (error) {
        console.error("Błąd pobierania listy anime:", error.message);
      }
    };

    fetchAnimeList();
  }, [searchTitle, searchGenre, sortOrder, page]);

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleSearchGenreChange = (e) => {
    setSearchGenre(e.target.value);
  };

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="anime-list-container">
      <h2 className="list-title">Anime list</h2>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTitle}
        onChange={handleSearchTitleChange}
        className="search-input"
      />
      <input
        type="text"
        placeholder="Search by genre"
        value={searchGenre}
        onChange={handleSearchGenreChange}
        className="search-input"
      />
      <button onClick={handleSortChange} className="list-button">
        {sortOrder === "asc" ? "Descending" : "Ascending"}
      </button>
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
