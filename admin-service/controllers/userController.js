const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Kullanıcı zaten mevcut" });

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ msg: "Kullanıcı kaydedildi" });
  } catch (err) {
    res.status(500).json({ msg: "Kayıt hatası", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Hatalı giriş" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Hatalı giriş" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, email });
  } catch (err) {
    res.status(500).json({ msg: "Giriş hatası", error: err.message });
  }
};
