const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// ERROR HANDLER
const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "src/config/config.env" });
}

// APP USE
app.use(
  "/public/uploads",
  express.static(path.resolve(__dirname, "../" + "public/uploads"))
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// ROUTE IMPORT
const albums = require("./routes/albums");
const songs = require("./routes/songs");

// CONTROLLERS
app.use("/api/album", albums);
app.use("/api/song", songs);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
