const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Bildirim işlemleri
 */

/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: Tüm bildirimleri getir
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Bildirim listesi başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "✅ Yeni rezervasyon: Oda 101, Kullanıcı: gizem123"
 *                       type:
 *                         type: string
 *                         example: "reservation"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
