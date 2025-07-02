const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Kullanıcı kayıt ve giriş işlemleri
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: user1234
 *     responses:
 *       201:
 *         description: Kayıt başarılı
 *       400:
 *         description: Kullanıcı zaten mevcut
 *       500:
 *         description: Sunucu hatası
 */
router.post("/register", register);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Kullanıcı girişi
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: user1234
 *     responses:
 *       200:
 *         description: Giriş başarılı, token döner
 *       400:
 *         description: Hatalı giriş
 *       500:
 *         description: Sunucu hatası
 */
router.post("/login", login);

module.exports = router;
