const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const SongModel = require("../models/songs");
const AlbumModel = require("../models/albums");
const sendResponse = require("../utils/sendResponse");
const path = require("path");
const fs = require("fs");

// REGISTER SONGS
exports.registerSong = catchAsyncErrors(async (req, res, next) => {
  const isAdded = await SongModel.findOne({
    name: req.body.name,
  });

  if (isAdded) {
    const imgPath = path.resolve(
      __dirname,
      "../../" + "public/uploads",
      req.file.filename
    );
    fs.unlinkSync(imgPath);

    return next(new ErrorHandler("Song Already Exist", 400));
  }

  const newSong = await SongModel.create({
    ...req.body,
    album: req.params.id,
  });

  const album = await AlbumModel.findById(req.params.id);
  album.songs.push(newSong._id);
  await album.save();

  sendResponse(true, 201, "song", newSong, res);
});

// REGISTER SONG WITH AUDIO
exports.registerSongAudio = catchAsyncErrors(async (req, res, next) => {
  const song = await SongModel.findById(req.params.id);
  song.audio = req.body.audio;
  await song.save();

  sendResponse(true, 201, "song", song, res);
});

// EDIT REGISTERED SONGS
exports.editSong = catchAsyncErrors(async (req, res, next) => {
  const updatedSong = await SongModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  sendResponse(true, 200, "song", updatedSong, res);
});
