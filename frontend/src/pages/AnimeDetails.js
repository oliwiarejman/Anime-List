import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  handleAddToWatchlist,
  handleAddToFavorites,
  handleAddToIgnored,
} from "../components/AddToLists";
import "../styles/styles.css";

const AnimeDetails = () => {
  const navigate = useNavigate();
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

  const handleDeleteAnime = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/anime/${animeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error deleting anime:", error.message);
    }
  };

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
    <div className="anime-details-container">
      <h2 className="anime-title">{title}</h2>
      <img
        src={image}
        alt={`${title} Cover`}
        style={{
          maxWidth: "100%",
          maxHeight: "400px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        }}
        className="anime-image"
      />
      <p className="average-rating">Average Rating: {averageRating}</p>
      <p className="anime-genre">Genre: {genre}</p>
      <p className="release-date">Release Date: {releaseDate}</p>
      <p className="description">Description: {description}</p>
      <h3 className="characters-heading">Characters:</h3>
      <ul className="characters-list">
        {characters.map((character, index) => (
          <li key={index} className="character-item">
            {`${character.name} - ${character.role}`}
          </li>
        ))}
      </ul>
      {isAdmin && (
        <button className="add-to-list-button" onClick={handleDeleteAnime}>
          Delete Anime
        </button>
      )}
      {isAdmin && (
        <div>
          <Link to={`/edit-anime/${animeId}`} className="edit-anime-link">
            <button className="edit-anime-button">Edit Anime</button>
          </Link>
        </div>
      )}
      <div className="add-to-lists-container">
        <h3>Add to Lists:</h3>
        {isLoggedIn && (
          <div>
            <button
              onClick={() => handleAddToWatchlist(animeDetails._id)}
              className="add-to-list-button"
            >
              Add to Watchlist
            </button>
            <button
              onClick={() => handleAddToFavorites(animeDetails._id)}
              className="add-to-list-button"
            >
              Add to Favorites
            </button>
            <button
              onClick={() => handleAddToIgnored(animeDetails._id)}
              className="add-to-list-button"
            >
              Add to Ignored
            </button>
          </div>
        )}
      </div>

      {isLoggedIn && (
        <div>
          <h3 className="add-comment-heading">Add a Comment:</h3>
          <form onSubmit={handleAddComment} className="add-comment-form">
            <label className="comment-label">
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
            <label className="comment-label">
              Comment:
              <textarea
                name="comment"
                value={commentData.comment}
                onChange={(e) =>
                  setCommentData({ ...commentData, comment: e.target.value })
                }
              />
            </label>
            <button type="submit" className="add-comment-button">
              Add Comment
            </button>
          </form>
        </div>
      )}
      <h3 className="reviews-heading">Reviews:</h3>
      <ul className="reviews-list">
        {reviews.map((review) => (
          <li key={review._id} className="review-item">
            <p className="review-user">
              {review.user && review.user.username
                ? review.user.username
                : "Unknown User"}{" "}
              | Rating: {review.rating}
            </p>
            <p className="review-comment">{review.comment}</p>
            {isAdmin && (
              <button
                onClick={() => handleDeleteComment(review._id)}
                className="delete-comment-button"
              >
                Delete Comment
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeDetails;
