const User = require("../models/user");
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

const userUpdate = async (req, res) => {
  try {
    console.log("update details");

    if (req.body.profileImg) {
      console.log("setting req.file");

      upload(req, res, (err) => {
        if (err) throw new Error(err.message);
        else {
          console.log(req.file);
        }
      });
    }

    if (req.file) {
      req.body.profileImg = {
        data: fs.readFileSync(
          path.join(__dirname + ".." + "uploads" + req.file.filename)
        ),
        contentType: req.file.mimetype,
      };
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { ...req.body },
      { runValidators: true, new: true }
    );

    res.json(user);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = userUpdate;
