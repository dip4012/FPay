const express = require("express");
const router = express.Router();

const userUpdate = require("../controllers/userUpdateDetails");

router.route("/update").patch(userUpdate);

module.exports = userUpdate;
