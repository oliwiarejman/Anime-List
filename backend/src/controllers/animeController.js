const Anime = require("../models/animeModel");

exports.getAllAnime = async (req, res) => {
  try {
    const allAnime = await Anime.find();
    res.json(allAnime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnimeById = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (anime) {
      res.json(anime);
    } else {
      res.status(404).json({ message: "Anime not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAnime = async (req, res) => {
  const anime = new Anime(req.body);

  try {
    const newAnime = await anime.save();
    res.status(201).json(newAnime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAnime = async (req, res) => {
  try {
    const updatedAnime = await Anime.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedAnime) {
      res.json(updatedAnime);
    } else {
      res.status(404).json({ message: "Anime not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAnime = async (req, res) => {
  try {
    const deletedAnime = await Anime.findByIdAndDelete(req.params.id);
    if (deletedAnime) {
      res.json({ message: "Anime deleted" });
    } else {
      res.status(404).json({ message: "Anime not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
