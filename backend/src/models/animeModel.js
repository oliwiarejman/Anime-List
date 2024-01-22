const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  genre: { type: String },
  characters: [{ name: String, role: String }],
  releaseDate: { type: Date },
  description: { type: String },
  image: { type: String },
  ratings: [{ type: Number }],
  averageRating: { type: Number, default: 0 },
});

AnimeSchema.methods.calculateAverageRating = function () {
  const sum = this.ratings.reduce((acc, rating) => acc + rating, 0);
  this.averageRating = sum / this.ratings.length || 0;
};

const Anime = mongoose.model("Anime", AnimeSchema);

module.exports = Anime;
