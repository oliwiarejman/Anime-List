import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnimeDetails = () => {
  const { animeId } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [commentData, setCommentData] = useState({
    rating: "",
    comment: "",
  });

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

    const token = window.localStorage.getItem("token");
    const userId = window.localStorage.getItem("userId");
    setIsLoggedIn(!!token);

    console.log("Token:", token);
    console.log("UserId:", userId);
  }, [animeId]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("token");

    console.log("UserId (from localStorage):", userId);
    console.log("Token (from localStorage):", token);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/reviews",
        {
          userId,
          animeId,
          rating: commentData.rating,
          comment: commentData.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

      setCommentData({
        rating: "",
        comment: "",
      });
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

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

      {isLoggedIn && (
        <div>
          <h3>Add a Comment:</h3>
          <form onSubmit={handleAddComment}>
            <label>
              Rating:
              <input
                type="number"
                name="rating"
                min="1"
                max="10"
                value={commentData.rating}
                onChange={(e) =>
                  setCommentData({ ...commentData, rating: e.target.value })
                }
              />
            </label>
            <label>
              Comment:
              <textarea
                name="comment"
                value={commentData.comment}
                onChange={(e) =>
                  setCommentData({ ...commentData, comment: e.target.value })
                }
              />
            </label>
            <button type="submit">Add Comment</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AnimeDetails;
