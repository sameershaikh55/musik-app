const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");
const audioUpload = require("../utils/audioUpload");

// CONTROLLERS
const {
  registerSong,
  editSong,
  registerSongAudio,
  getSong,
  deleteSong,
} = require("../controller/song");

// ROUTES
router
  .route("/:id")
  .get(getSong)
  .post(upload.single("image"), registerSong)
  .put(upload.single("image"), editSong)
  .delete(deleteSong);

router.route("/audio/:id").post(audioUpload.single("audio"), registerSongAudio);

module.exports = router;
