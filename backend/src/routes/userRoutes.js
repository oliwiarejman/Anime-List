const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.post("/login", userController.loginUser);
router.post("/:id/watchlist", authMiddleware, userController.addToWatchlist);
router.post("/:id/favorites", authMiddleware, userController.addToFavorites);
router.post("/:id/ignored", authMiddleware, userController.addToIgnored);

module.exports = router;
