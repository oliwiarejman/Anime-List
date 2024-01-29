import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAnime = () => {
  const [animeData, setAnimeData] = useState({
    title: "",
    genre: "",
    characters: [],
    releaseDate: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimeData({ ...animeData, [name]: value });
  };

  const handleCharacterChange = (index, e) => {
    const charactersCopy = [...animeData.characters];
    charactersCopy[index][e.target.name] = e.target.value;
    setAnimeData({ ...animeData, characters: charactersCopy });
  };

  const handleAddCharacter = () => {
    setAnimeData({
      ...animeData,
      characters: [...animeData.characters, { name: "", role: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/anime",
        animeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/anime/${response.data._id}`);
    } catch (error) {
      console.error("Error adding anime:", error.message);
    }
  };

  return (
    <div>
      <h2>Add Anime</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={animeData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={animeData.genre}
            onChange={handleChange}
          />
        </label>
        <label>
          Release Date:
          <input
            type="date"
            name="releaseDate"
            value={animeData.releaseDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={animeData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={animeData.image}
            onChange={handleChange}
          />
        </label>
        <h3>Characters:</h3>
        {animeData.characters.map((character, index) => (
          <div key={index}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={character.name}
                onChange={(e) => handleCharacterChange(index, e)}
              />
            </label>
            <label>
              Role:
              <input
                type="text"
                name="role"
                value={character.role}
                onChange={(e) => handleCharacterChange(index, e)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddCharacter}>
          Add Character
        </button>
        <button type="submit">Add Anime</button>
      </form>
    </div>
  );
};

export default AddAnime;
