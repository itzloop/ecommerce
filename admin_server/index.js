const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const port = process.env.PRIVATE_PORT || 3001;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validate } = require("../validations/validation");
dotenv.config({ path: "../.env", debug: true });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.post("/api/admin/register", validate("register"), async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      role: "admin",
    });
    await user.save();
    res.status(201).json({ detail: "Admin User Created!" });
  } catch (e) {
    if (e.code === 11000)
      return res.status(409).json({ detail: "User exists!" });
    return res.status(400).json({ detail: e.errmsg });
  }
});

app.post("/api/admin/login", validate("login"), async (req, res) => {
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
      detail: e.errmsg,
    });
  }
});

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error("Failed to Connect To Database!");
      return;
    }
    console.log("Connected to Database!");
  }
);

app.listen(port, () => {
  console.log(`Private Server started on port ${port}...`);
});
