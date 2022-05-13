const User = require("../models/user");

const login = async (req, res) => {
  try {
    const { phone } = req.body;

    let user = await User.findOne({ phone: phone });

    if (!user) {
      user = await User.create({ ...req.body });
    }

    const token = await user.createJWT();
    res.json({ user, token: token });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = login;
