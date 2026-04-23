exports.register = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔥 DEBUG

    const { username, email, password } = req.body;

    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    res.json({ msg: "User registered" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};