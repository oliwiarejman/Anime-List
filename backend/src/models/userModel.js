const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  watchlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Anime", default: [] },
  ],
  favorites: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Anime", default: [] },
  ],
  ignored: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Anime", default: [] },
  ],
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
