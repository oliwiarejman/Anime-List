const express = require("express");
const router = express.Router();
const animeController = require("../controllers/animeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", animeController.getAllAnime);
router.get("/search", animeController.searchAnime);
router.get("/:id", animeController.getAnimeById);
router.post("/", authMiddleware, animeController.createAnime);
router.put("/:id", authMiddleware, animeController.updateAnime);
router.delete("/:id", authMiddleware, animeController.deleteAnime);

module.exports = router;
