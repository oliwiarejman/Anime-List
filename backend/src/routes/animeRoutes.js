const express = require("express");
const router = express.Router();
const animeController = require("../controllers/animeController");

router.get("/anime", animeController.getAllAnime);
router.get("/anime/:id", animeController.getAnimeById);
router.post("/anime", animeController.createAnime);
router.put("/anime/:id", animeController.updateAnime);
router.delete("/anime/:id", animeController.deleteAnime);

module.exports = router;
