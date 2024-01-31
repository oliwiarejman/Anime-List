import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AnimeDetails from "./pages/AnimeDetails";
import AddAnime from "./components/AddAnime";
import EditAnime from "./components/EditAnime";
import Watchlist from "./components/Watchlist";
import Favorites from "./components/Favorites";
import Ignored from "./components/Ignored";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/anime/:animeId" element={<AnimeDetails />} />
        <Route path="/edit-anime/:animeId" element={<EditAnime />} />
        <Route path="/add-anime" element={<AddAnime />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/ignored" element={<Ignored />} />
      </Routes>
    </Router>
  );
}

export default App;
