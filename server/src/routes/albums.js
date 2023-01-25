const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");

const {
  getAlbums,
  registerAlbum,
  editAlbum,
  getAlbum,
} = require("../controller/album");

// ALL ALBUMS
router.route("/").get(getAlbums);
router.route("/").post(upload.single("image"), registerAlbum);
router.route("/:id").get(getAlbum).put(upload.single("image"), editAlbum);

module.exports = router;
