const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const sharp = require("sharp");
const { uploadImage } = require("./middleware/multer");
const config = require("config");

// app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));


const port = process.env.PORT || 5000;

const corsOption = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOption));

//Upload route
app.post("/upload", uploadImage, (req, res, next) => {
  try {
    const { size } = req.body;
    if (!req.file) {
      return res.send({ message: "Please select an image" });
    }
    if (!size) {
      return res.send({ message: "Please select a resolution" });
    }

    sharp(req.file.path)
      .resize(parseInt(size), parseInt(size))
      .toFile(
        "uploads/" + "thumbnails-" + req.file.originalname.replace(/\s/g, "")
      );
    return res.status(201).json({
      message: "Thumbnail generated successfully",
      thumbnailLink: `https://thumbnail-backend.herokuapp.com/uploads/thumbnails-${req.file.originalname.replace(/\s/g, "")}`,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//get home
app.get("/", (req, res) => res.send("hello world"));

app.listen(port);
