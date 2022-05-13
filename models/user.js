const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
    min: 1000000000,
    max: 9999999999,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  profileImg: {
    data: Buffer,
    contentType: String,
  },
  accounts: [
    {
      type: String,
    },
  ],
});

UserSchema.methods.createJWT = async function () {
  const token = jwt.sign(
    {
      id: this.id,
      name: this.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  return token;
};

module.exports = mongoose.model("User", UserSchema);
