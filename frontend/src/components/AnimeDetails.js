import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnimeDetails = () => {
  const { animeId } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/anime/${animeId}`
        );
        setAnimeDetails(response.data);
      } catch (error) {
        console.error("Error fetching anime details:", error.message);
      }
    };

    fetchAnimeDetails();
  }, [animeId]);

  if (!animeDetails) {
    return <p>Loading...</p>;
  }

  const {
    title,
    genre,
    characters,
    releaseDate,
    description,
    image,
    ratings,
    averageRating,
  } = animeDetails;

  return (
    <div>
      <h2>{title}</h2>
      <img src={image} alt={`${title} Cover`} style={{ maxWidth: "100%" }} />
      <p>Genre: {genre}</p>
      <p>Release Date: {releaseDate}</p>
      <p>Description: {description}</p>
      <h3>Characters:</h3>
      <ul>
        {characters.map((character, index) => (
          <li key={index}>{`${character.name} - ${character.role}`}</li>
        ))}
      </ul>
      <p>Average Rating: {averageRating}</p>
    </div>
  );
};

export default AnimeDetails;
