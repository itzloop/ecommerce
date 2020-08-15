const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validate } = require("../middlewares/validation");

// Base Url: /api/user

router.post("/register", validate("register"), async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
    });
    await user.save();
    res.status(201).json({ detail: "User Created!" });
  } catch (e) {
    if (e.code === 11000)
      return res.status(409).json({ detail: "User exists!" });
    return res.status(400).json({ detail: e.errmsg });
  }
});

router.post("/login", validate("login"), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ detail: "User Not Found!" });

    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) return res.status(404).json({ detail: "User Not Found!" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.header("Authorization", token).json({
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (e) {
    res.status(400).json({
      detail: e,
    });
  }
});

module.exports = router;
