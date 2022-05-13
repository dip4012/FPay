const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader === "") throw new Error("Please login again!!");

    const token = await authHeader.split(" ")[1];
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, name: payload.name };
    next();
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = auth;
