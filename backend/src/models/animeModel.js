const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  characters: [{ name: String, role: String }],
  releaseDate: { type: Date },
  description: { type: String },
  image: { type: String },
  animeId: { type: String, unique: true, required: true },
});

const Anime = mongoose.model("Anime", AnimeSchema);

module.exports = Anime;
