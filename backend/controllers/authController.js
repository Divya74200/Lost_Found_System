const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    res.json({ msg: "User registered successfully" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};