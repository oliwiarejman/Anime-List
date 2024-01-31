import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimeList from "../components/AnimeList";
import axios from "axios";
import "../styles/styles.css";

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
      <h1>AnimeList</h1>
      {isAdmin && (
        <Link to="/add-anime">
          <button className="list-button">Add Anime</button>
        </Link>
      )}
      {isLoggedIn ? (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      ) : (
        <Link to="/login" className="login-link">
          Login
        </Link>
      )}
      {isLoggedIn && (
        <div>
          <Link to="/watchlist">
            <button className="list-button">Watchlist</button>
          </Link>
          <Link to="/favorites">
            <button className="list-button">Favorites</button>
          </Link>
          <Link to="/ignored">
            <button className="list-button">Ignored</button>
          </Link>
        </div>
      )}
      <AnimeList />
    </div>
  );
};

export default Home;
