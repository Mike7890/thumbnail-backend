const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, "image-" + file.originalname.replace(/\s/g, ""));
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
  // try {
  //   const temp = path.join(__dirname, "../uploads");
  //   console.log("temp", temp);
  //   // if (!fs.existsSync(temp)) {
  //   fs.mkdir(path.join(__dirname, "../test"), { recursive: true }, (err) => {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     console.log("Directory created successfully!");
  //   });
  //   fs.mkdirSync("/uploads", { recursive: true });
  //   fs.chmodSync(temp, "755", (err) => {
  //     console.log("ERROR IN FS", err.message);
  //   });
  //   // }
  // } catch (error) {
  //   console.log("Eror", error);
  // }

  // fs.chmodSync(path.join(__dirname, "../uploads"), "755", (err) => {
  //   console.log("ERROR IN FS", err.message);
  // });
  upload(req, res, function (err) {
    if (err) {
      return res.send({ message: `${err.message}` });
    }
    next();
  });
};
module.exports = { uploadImage };
