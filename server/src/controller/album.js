const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const AlbumModel = require("../models/albums");
const sendResponse = require("../utils/sendResponse");
const path = require("path");
const fs = require("fs");

// GET ALBUMS
exports.getAlbums = catchAsyncErrors(async (req, res, next) => {
  const albums = await AlbumModel.find();
  const imageUrl = `${req.protocol}://${req.get("host")}/public/uploads/`;

  sendResponse(
    true,
    200,
    "albums",
    {
      pictureUrl: imageUrl,
      albums,
    },
    res
  );
});

// GET ALBUM
exports.getAlbum = catchAsyncErrors(async (req, res, next) => {
  const album = await AlbumModel.findById(req.params.id).populate("songs");
  const imageUrl = `${req.protocol}://${req.get("host")}/public/uploads/`;

  sendResponse(
    true,
    200,
    "album",
    {
      pictureUrl: imageUrl,
      album,
    },
    res
  );
});

// ADD ALBUMS
exports.registerAlbum = catchAsyncErrors(async (req, res, next) => {
  const isAdded = await AlbumModel.findOne({
    name: req.body.name,
  });

  if (isAdded) {
    const imgPath = path.resolve(
      __dirname,
      "../../" + "public/uploads",
      req.file.filename
    );
    fs.unlinkSync(imgPath);

    return next(new ErrorHandler("Album Already Exist", 400));
  }

  const newAlbum = await AlbumModel.create(req.body);

  sendResponse(true, 201, "album", newAlbum, res);
});

// EDIT ALBUMS
exports.editAlbum = catchAsyncErrors(async (req, res, next) => {
  const updatedAlbum = await AlbumModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  sendResponse(true, 200, "album", updatedAlbum, res);
});
