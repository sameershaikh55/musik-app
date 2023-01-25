const multer = require("multer");
const { ObjectId } = require("mongodb");
const ErrorHandler = require("./errorhandler");
const path = require("path");

const upload = multer({
  limits: {
    fileSize: 100000000000000,
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/gif|mp3|MP3|ogg|wav|aac|flac|m4a/)) {
      cb(new ErrorHandler("Please upload a valid audio file", 422));
    }
    cb(undefined, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "../../" + "public/uploads"));
    },
    filename: (req, file, cb) => {
      if (req.params.id) {
        req.body.audio = req.params.id + `.${file.mimetype.split("/").pop()}`;
        cb(null, req.body.audio);
      } else {
        req.body._id = new ObjectId();
        req.body.audio =
          req.body._id.toString() + `.${file.mimetype.split("/").pop()}`;

        cb(null, req.body.audio);
      }
    },
    onerror: (err, next) => {
      console.log(err);
      next();
    },
  }),
});

module.exports = upload;
