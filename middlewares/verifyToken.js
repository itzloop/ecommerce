const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) res.status(401).json({ detail: "Unauthorization!" });
  try {
    const verfied = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verfied;
    next();
  } catch (e) {
    res.status(401).json({ detail: "Unauthorization!" });
  }
};

module.exports = verifyToken;
