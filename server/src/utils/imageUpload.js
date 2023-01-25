const multer = require("multer");
const { ObjectId } = require("mongodb");
const ErrorHandler = require("./errorhandler");
const path = require("path");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new ErrorHandler("Please upload a valid image file", 422));
    }
    cb(undefined, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "../../" + "public/uploads"));
    },
    filename: (req, file, cb) => {
      if (req.params.id) {
        req.body.image = req.params.id + `.${file.mimetype.split("/").pop()}`;

        cb(null, req.body.image);
      } else {
        req.body._id = new ObjectId();
        req.body.image =
          req.body._id.toString() + `.${file.mimetype.split("/").pop()}`;

        cb(null, req.body.image);
      }
    },
    onerror: (err, next) => {
      console.log(err);
      next();
    },
  }),
});

module.exports = upload;
