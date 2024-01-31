import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimeList from "../components/AnimeList";
import axios from "axios";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const userId = window.localStorage.getItem("userId");

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
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <div>
      <h1>Home</h1>
      <AnimeList />

      {isAdmin && (
        <Link to="/add-anime">
          <button>Add Anime</button>
        </Link>
      )}

      {isLoggedIn && (
        <div>
          <Link to="/watchlist">
            <button>Watchlist</button>
          </Link>
          <Link to="/favorites">
            <button>Favorites</button>
          </Link>
          <Link to="/ignored">
            <button>Ignored</button>
          </Link>
        </div>
      )}

      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Home;
