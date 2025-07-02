const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Yetkilendirme başarısız" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // kullanıcının ID'si yorum için lazım
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Geçersiz token" });
  }
};

module.exports = verifyToken;
