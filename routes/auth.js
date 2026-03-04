const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.json({ status: "error", message: "User exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hashedPassword
  });

  res.json({ status: "ok", message: "Signup successful" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ status: "error", message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.json({ status: "error", message: "Incorrect password" });

  res.json({ status: "ok", username: user.username });
});

module.exports = router;
