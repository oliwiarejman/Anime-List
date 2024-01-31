const Review = require("../models/reviewModel");
const Anime = require("../models/animeModel");
const User = require("../models/userModel");

exports.getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.find();
    res.json(allReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReview = async (req, res) => {
  const { userId, animeId, rating, comment } = req.body;

  try {
    console.log("Received review data:", { userId, animeId, rating, comment });

    const user = await User.findById(userId);
    if (!user) {
      console.error("Error adding review: User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const review = new Review({ user: userId, animeId, rating, comment });
    await review.save();

    console.log("Review added successfully");

    const allReviews = await Review.find({ animeId });

    const ratings = allReviews.map((review) => review.rating);
    const averageRating = calculateAverageRating(ratings);

    const updatedAnime = await Anime.findByIdAndUpdate(
      animeId,
      { $set: { ratings, averageRating } },
      { new: true }
    );

    console.log("Anime updated successfully");

    res.json(updatedAnime);
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

function calculateAverageRating(ratings) {
  if (ratings.length === 0) {
    return 0;
  }

  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const average = sum / ratings.length;
  return parseFloat(average.toFixed(2));
}

exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedReview) {
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized - Admin only" });
    }

    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (deletedReview) {
      res.json({ message: "Review deleted" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReviewsByAnimeId = async (req, res) => {
  const animeId = req.params.animeId;

  try {
    const reviews = await Review.find({ animeId }).populate("user", "username");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
