const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Yetkilendirme başarısız" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Geçersiz token" });
  }
};

// 🔹 Opsiyonel sürüm: Token varsa req.admin'e ekle, yoksa devam et
verifyToken.optional = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(); // Token yoksa sorun yok, geç
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
  } catch (err) {
    // Token varsa ama hatalıysa yine de devam eder, kullanıcı eklenmez
  }

  next();
};

module.exports = verifyToken;
