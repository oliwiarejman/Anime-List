const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { getLoggedInUser } = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.post("/login", userController.loginUser);
router.post("/watchlist", authMiddleware, userController.addToWatchlist);
router.post("/favorites", authMiddleware, userController.addToFavorites);
router.post("/ignored", authMiddleware, userController.addToIgnored);
router.get("/:id/watchlist", authMiddleware, userController.getWatchlist);
router.get("/:id/favorites", authMiddleware, userController.getFavorites);
router.get("/:id/ignored", authMiddleware, userController.getIgnored);
router.delete(
  "/watchlist/:animeId",
  authMiddleware,
  userController.removeFromWatchlist
);

router.delete(
  "/favorites/:animeId",
  authMiddleware,
  userController.removeFromFavorites
);

router.delete(
  "/ignored/:animeId",
  authMiddleware,
  userController.removeFromIgnored
);

module.exports = router;
