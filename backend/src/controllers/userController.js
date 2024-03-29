const User = require("../models/userModel");
const Anime = require("../models/animeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validationResult } = require("express-validator");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized - Admin only" });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.user = { userId: user._id, email: user.email, role: user.role };
    console.log("User information:", req.user);

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToWatchlist = async (req, res) => {
  const animeId = req.body.animeId;
  const userId = req.user.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { watchlist: animeId } },
      { new: true }
    );

    res.json(updatedUser.watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToFavorites = async (req, res) => {
  const animeId = req.body.animeId;
  const userId = req.user.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: animeId } },
      { new: true }
    );

    res.json(updatedUser.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToIgnored = async (req, res) => {
  const animeId = req.body.animeId;
  const userId = req.user.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { ignored: animeId } },
      { new: true }
    );

    res.json(updatedUser.ignored);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWatchlist = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const watchlist = await Anime.find({ _id: { $in: user.watchlist } });

    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favorites = await Anime.find({ _id: { $in: user.favorites } });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIgnored = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const ignored = await Anime.find({ _id: { $in: user.ignored } });

    res.json(ignored);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  const animeId = req.params.animeId;
  const userId = req.user.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { watchlist: animeId } },
      { new: true }
    );

    res.json(updatedUser.watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromFavorites = async (req, res) => {
  const animeId = req.params.animeId;
  const userId = req.user.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: animeId } },
      { new: true }
    );

    res.json(updatedUser.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromIgnored = async (req, res) => {
  const animeId = req.params.animeId;
  const userId = req.user.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { ignored: animeId } },
      { new: true }
    );

    res.json(updatedUser.ignored);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
