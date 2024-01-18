const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const animeRoutes = require("./routes/animeRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Anime-List", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Błąd połączenia z bazą danych:"));
db.once("open", function () {
  console.log("Połączono z bazą danych Anime-List");

  mongoose.connection.db.createCollection(
    "anime_database",
    function (err, collection) {
      if (err) throw err;
      console.log("Kolekcja 'anime_database' została utworzona.");
    }
  );

  mongoose.connection.db.createCollection(
    "user_database",
    function (err, collection) {
      if (err) throw err;
      console.log("Kolekcja 'user_database' została utworzona.");
    }
  );
});

app.use("/api/anime_database", animeRoutes);
app.use("/api/users_database", userRoutes);

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
