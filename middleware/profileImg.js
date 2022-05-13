const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "../uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("profileImg");

const uploadProfileImg = async (req, res, next) => {
  try {
    console.log("setting req.file");
    if (req.body.profileImg !== null) {
      upload(req, res, (err) => {
        if (err) throw new Error(err.message);
        else {
          console.log(req.file);
        }
      });
    }
    next();
  } catch (error) {
    res.send({ msg: error.message });
  }
};

module.exports = uploadProfileImg;
