import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnimeDetails = () => {
  const { animeId } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/anime/${animeId}`
        );
        setAnimeDetails(response.data);

        const reviewsResponse = await axios.get(
          `http://localhost:3000/api/reviews/anime/${animeId}`
        );

        const usersResponse = await Promise.all(
          reviewsResponse.data.map((review) =>
            axios.get(`http://localhost:3000/api/users/${review.userId}`)
          )
        );

        const reviewsWithUsers = reviewsResponse.data.map((review, index) => ({
          ...review,
          user: usersResponse[index].data,
        }));

        setReviews(reviewsWithUsers);
      } catch (error) {
        console.error(
          "Error fetching anime details or reviews:",
          error.message
        );
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

      <h3>Reviews:</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>
              {" "}
              {review.user && review.user.username} | Rating: {review.rating}
            </p>
            {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeDetails;
