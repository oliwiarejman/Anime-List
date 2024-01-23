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
  console.log("User information:", req.user);

  if (req.user && req.user.role === "admin") {
    const anime = new Anime(req.body);

    try {
      const newAnime = await anime.save();
      res.status(201).json(newAnime);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    console.log("Unauthorized - Admin only");
    res.status(403).json({ message: "Unauthorized - Admin only" });
  }
};

exports.updateAnime = async (req, res) => {
  if (req.user && req.user.role === "admin") {
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
  } else {
    res.status(403).json({ message: "Unauthorized - Admin only" });
  }
};

exports.deleteAnime = async (req, res) => {
  if (req.user && req.user.role === "admin") {
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
  } else {
    res.status(403).json({ message: "Unauthorized - Admin only" });
  }
};

exports.searchAnime = async (req, res) => {
  const { title, genre, rating, sortOrder } = req.query;
  const query = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  if (genre) {
    query.genre = { $regex: genre, $options: "i" };
  }

  if (rating) {
    query.averageRating = { $gte: parseFloat(rating) };
  }

  let sortDirection = 1;

  if (sortOrder && sortOrder.toLowerCase() === "desc") {
    sortDirection = -1;
  }

  try {
    const results = await Anime.find(query).sort({
      averageRating: sortDirection,
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
