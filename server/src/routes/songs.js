const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");
const audioUpload = require("../utils/audioUpload");

// CONTROLLERS
const {
  registerSong,
  editSong,
  registerSongAudio,
} = require("../controller/song");

// ROUTES
router
  .route("/:id")
  .post(upload.single("image"), registerSong)
  .put(upload.single("image"), editSong);

router.route("/audio/:id").post(audioUpload.single("audio"), registerSongAudio);

module.exports = router;
