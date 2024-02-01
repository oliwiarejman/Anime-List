const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const animeRoutes = require("./src/routes/animeRoutes");
const userRoutes = require("./src/routes/userRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://root:example@localhost:27017/Anime-List?authSource=admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const animeDB = mongoose.connection;
animeDB.on(
  "error",
  console.error.bind(console, "Błąd połączenia z Anime-List:")
);
animeDB.once("open", function () {
  console.log("Połączono z Anime-List");
});

app.use("/api/anime", animeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
