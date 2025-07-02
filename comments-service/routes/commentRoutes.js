const express = require('express');
const router  = express.Router();
const { createComment, getScoreSummary } = require('../controllers/commentController');
const verifyToken = require('../middleware/verifyToken');

/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: Yeni bir yorum ekle
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [roomId, comment, scores]
 *             properties:
 *               roomId:   { type: string,  example: "123456" }
 *               comment:  { type: string,  example: "Otel çok güzeldi!" }
 *               scores:
 *                 type: object
 *                 properties:
 *                   temizlik: { type: integer, example: 5 }
 *                   servis:   { type: integer, example: 4 }
 *                   konfor:   { type: integer, example: 5 }
 *     responses:
 *       201: { description: Yorum başarıyla eklendi }
 *       400: { description: Eksik veri }
 *       401: { description: Yetkisiz }
 */
router.post('/', verifyToken, createComment);

/**
 * @swagger
 * /api/v1/comments/score-summary:
 *   get:
 *     summary: Odaya ait ortalama puanlar
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Puan özeti
 *         content:
 *           application/json:
 *             example:
 *               roomId: "123456"
 *               totalComments: 12
 *               average10: 9.2
 *               categories:
 *                 - key: temizlik
 *                   avg10: 9.4
 *                 - key: servis
 *                   avg10: 9.1
 *                 - key: konfor
 *                   avg10: 9.0
 */
router.get('/score-summary', getScoreSummary);

module.exports = router;
