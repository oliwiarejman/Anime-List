const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  animeId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
