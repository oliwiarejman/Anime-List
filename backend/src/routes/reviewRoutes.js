const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);
router.get("/anime/:animeId", reviewController.getReviewsByAnimeId);
router.post("/", authMiddleware, reviewController.createReview);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", authMiddleware, reviewController.deleteReview);

module.exports = router;
