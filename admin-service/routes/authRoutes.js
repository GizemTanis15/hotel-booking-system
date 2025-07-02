const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");
const Admin = require("../models/Admin");

/**
 * @swagger
 * /api/v1/admin/register:
 *   post:
 *     summary: Admin kaydı oluştur
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Kayıt başarılı
 *       400:
 *         description: Admin zaten var
 */
router.post("/register", register);

/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     summary: Admin girişi yap
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Giriş başarılı, token döner
 *       400:
 *         description: Geçersiz bilgiler
 */
router.post("/login", login);

/**
 * @swagger
 * /api/v1/admin/profile:
 *   get:
 *     summary: Giriş yapan admin profilini getir
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin profili
 *       401:
 *         description: Yetkisiz
 */
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) return res.status(404).json({ msg: "Admin bulunamadı" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ msg: "Sunucu hatası" });
  }
});

module.exports = router;
