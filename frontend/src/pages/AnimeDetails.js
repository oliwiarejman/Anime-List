import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  handleAddToWatchlist,
  handleAddToFavorites,
  handleAddToIgnored,
} from "../components/AddToLists";

const AnimeDetails = () => {
  const { animeId } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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
          reviewsResponse.data.map(async (review) => {
            try {
              if (review.userId) {
                const userResponse = await axios.get(
                  `http://localhost:3000/api/users/${review.userId}`
                );
                return userResponse.data;
              } else {
                return null;
              }
            } catch (userError) {
              console.error("Error fetching user details:", userError.message);
              return null;
            }
          })
        );

        const reviewsWithUsers = await Promise.all(
          reviewsResponse.data.map(async (review, index) => {
            const user = usersResponse[index];
            if (user) {
              const username = user.username;
              return { ...review, user: { username } };
            } else {
              return review;
            }
          })
        );

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

    if (userId) {
      axios
        .get(`http://localhost:3000/api/users/${userId}`)
        .then((response) => {
          const userRole = response.data.role;
          setIsAdmin(userRole === "admin");
        })
        .catch((error) => {
          console.error("Error fetching user role:", error.message);
        });
    }
  }, [animeId]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("token");

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

      const newReview = response.data;

      const userResponse = await axios.get(
        `http://localhost:3000/api/users/${userId}`
      );
      const newUser = userResponse.data;

      setReviews((prevReviews) => [
        ...prevReviews,
        { ...newReview, user: { username: newUser.username } },
      ]);

      setCommentData({
        rating: "",
        comment: "",
      });
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const handleDeleteComment = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3000/api/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error.message);
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
      <p>Average Rating: {averageRating}</p>
      <p>Genre: {genre}</p>
      <p>Release Date: {releaseDate}</p>
      <p>Description: {description}</p>
      <h3>Characters:</h3>
      <ul>
        {characters.map((character, index) => (
          <li key={index}>{`${character.name} - ${character.role}`}</li>
        ))}
      </ul>
      <div>
        <h3>Add to Lists:</h3>
        {isLoggedIn && (
          <div>
            <button onClick={() => handleAddToWatchlist(animeDetails._id)}>
              Add to Watchlist
            </button>
            <button onClick={() => handleAddToFavorites(animeDetails._id)}>
              Add to Favorites
            </button>
            <button onClick={() => handleAddToIgnored(animeDetails._id)}>
              Add to Ignored
            </button>
          </div>
        )}
      </div>
      <h3>Reviews:</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>
              {review.user && review.user.username
                ? review.user.username
                : "Unknown User"}{" "}
              | Rating: {review.rating}
            </p>
            {review.comment}
            {isAdmin && (
              <button onClick={() => handleDeleteComment(review._id)}>
                Delete Comment
              </button>
            )}
          </li>
        ))}
      </ul>
      {isAdmin && (
        <div>
          <h3>Edit Anime:</h3>
          <Link to={`/edit-anime/${animeId}`}>
            <button>Edit</button>
          </Link>
        </div>
      )}

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
