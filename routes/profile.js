const router = require("express").Router();
const User = require("../models/User");
const { validate } = require("../middlewares/validation");
const verifyToken = require("../middlewares/verifyToken");
const delay = require("../middlewares/delay");

// BASE URL /users/profile

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user) return res.json({ name: user.name, email: user.email });
    return res.status(404).json({ detail: "no user found" });
  } catch (e) {
    res.status(400).json({
      detail: e,
    });
  }
});

module.exports = router;
