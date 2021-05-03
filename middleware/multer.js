const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, "image-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);
const uploadImage = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.send({ message: `${err.message}` });
    }
    next();
  });
};
module.exports = { uploadImage };
