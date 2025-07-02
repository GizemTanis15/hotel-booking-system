const express = require("express");
const router = express.Router();
const { searchRooms } = require("../controllers/searchController");
const verifyToken = require("../middleware/verifyToken");

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Otel arama işlemleri
 */

/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     summary: Müsait odaları ara
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: destination
 *         schema:
 *           type: string
 *         required: true
 *         description: Varış noktası (örn. İstanbul)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Giriş tarihi
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Çıkış tarihi
 *       - in: query
 *         name: guests
 *         schema:
 *           type: integer
 *         required: true
 *         description: Kişi sayısı
 *     responses:
 *       200:
 *         description: Müsait odalar başarıyla listelendi
 *       400:
 *         description: Eksik ya da hatalı parametre
 *       500:
 *         description: Sunucu hatası
 */
router.get("/search", verifyToken.optional, searchRooms);

module.exports = router;
