import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AnimeDetails from "./pages/AnimeDetails";
import AddAnime from "./components/AddAnime";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/anime/:animeId" element={<AnimeDetails />} />
        <Route path="/add-anime" element={<AddAnime />} />
      </Routes>
    </Router>
  );
}

export default App;
