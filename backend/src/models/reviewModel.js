const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  animeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Anime",
    required: true,
  },
  rating: { type: Number, required: true },
  comment: { type: String },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
