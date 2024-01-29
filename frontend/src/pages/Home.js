// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import AnimeList from "../components/AnimeList";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <AnimeList />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
