const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const animeRoutes = require("./routes/animeRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/anime_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const animeDB = mongoose.connection;
animeDB.on(
  "error",
  console.error.bind(console, "Błąd połączenia z anime_database:")
);
animeDB.once("open", function () {
  console.log("Połączono z anime_database");
});

mongoose.connect("mongodb://localhost:27017/user_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userDB = mongoose.connection;
userDB.on(
  "error",
  console.error.bind(console, "Błąd połączenia z user_database:")
);
userDB.once("open", function () {
  console.log("Połączono z user_database");
});

const Anime = require("./models/animeModel");
const User = require("./models/userModel");
const Review = require("./models/reviewModel");

app.use("/api", animeRoutes);

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
