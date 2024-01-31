import axios from "axios";

const handleAddToWatchlist = async (animeId) => {
  const token = window.localStorage.getItem("token");

  try {
    await axios.post(
      "http://localhost:3000/api/users/watchlist",
      { animeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error adding to watchlist:", error.message);
  }
};

const handleRemoveFromWatchlist = async (animeId) => {
  const token = window.localStorage.getItem("token");

  try {
    await axios.delete(`http://localhost:3000/api/users/watchlist/${animeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error removing from watchlist:", error.message);
  }
};

const handleAddToFavorites = async (animeId) => {
  const token = window.localStorage.getItem("token");

  try {
    await axios.post(
      "http://localhost:3000/api/users/favorites",
      { animeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error adding to favorites:", error.message);
  }
};

const handleRemoveFromFavorites = async (animeId) => {
  const token = window.localStorage.getItem("token");

  try {
    await axios.delete(`http://localhost:3000/api/users/favorites/${animeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error removing from favorites:", error.message);
  }
};

const handleAddToIgnored = async (animeId) => {
  const token = window.localStorage.getItem("token");

  try {
    await axios.post(
      "http://localhost:3000/api/users/ignored",
      { animeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error adding to ignored:", error.message);
  }
};

const handleRemoveFromIgnored = async (animeId) => {
  const token = window.localStorage.getItem("token");

  try {
    await axios.delete(`http://localhost:3000/api/users/ignored/${animeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error removing from ignored:", error.message);
  }
};

export {
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  handleAddToFavorites,
  handleRemoveFromFavorites,
  handleAddToIgnored,
  handleRemoveFromIgnored,
};
