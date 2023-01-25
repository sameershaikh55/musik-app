const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const song = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your song name"],
    unique: true,
  },
  image: {
    type: String,
    required: [true, "Please upload a song Image"],
    trim: true,
  },
  audio: {
    type: String,
    trim: true,
  },
  album: {
    type: mongoose.Types.ObjectId,
    ref: "albums",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SongModel = new model("song", song);
module.exports = SongModel;
