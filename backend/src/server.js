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
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Błąd połączenia z MongoDB:"));
db.once("open", function () {
  console.log("Połączono z MongoDB");
});

const Anime = require("./models/animeModel");
const User = require("./models/userModel");
const Review = require("./models/reviewModel");

app.use("/api", animeRoutes);

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
