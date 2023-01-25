const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const album = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Album name"],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please Enter Your Album description"],
  },
  image: {
    type: String,
    required: [true, "Please upload an Album Image"],
    trim: true,
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "song",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AlbumModel = new model("album", album);
module.exports = AlbumModel;
