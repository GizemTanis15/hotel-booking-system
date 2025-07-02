const express = require("express");
const router = express.Router();
const {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  addAvailability, // ✅ Yeni controller
} = require("../controllers/roomController");

const verifyToken = require("../middleware/verifyToken");

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Oda işlemleri
 */

/**
 * @swagger
 * /api/v1/rooms:
 *   post:
 *     summary: Yeni oda oluştur
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNumber:
 *                 type: string
 *                 example: "101"
 *               roomType:
 *                 type: string
 *                 example: "Single"
 *               price:
 *                 type: number
 *                 example: 150
 *               description:
 *                 type: string
 *                 example: "Deniz manzaralı tek kişilik oda"
 *               destination:
 *                  type: string
 *                  example: "İstanbul"
 *               capacity:                     # ✅ BURAYI EKLE
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Oda oluşturuldu
 */
router.post("/", verifyToken, createRoom);

/**
 * @swagger
 * /api/v1/rooms:
 *   get:
 *     summary: Tüm odaları getir
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Oda listesi döner
 */
router.get("/", getRooms);

/**
 * @swagger
 * /api/v1/rooms/{id}:
 *   put:
 *     summary: Oda bilgilerini güncelle
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Güncellenecek odanın ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomType:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Oda güncellendi
 */
router.put("/:id", verifyToken, updateRoom);

/**
 * @swagger
 * /api/v1/rooms/{id}:
 *   delete:
 *     summary: Odayı sil
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek odanın ID'si
 *     responses:
 *       200:
 *         description: Oda silindi
 */
router.delete("/:id", verifyToken, deleteRoom);

/**
 * @swagger
 * /api/v1/rooms/{id}/availability:
 *   post:
 *     summary: Odaya müsaitlik bilgisi ekle
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Oda ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-10"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-15"
 *               totalRooms:
 *                 type: number
 *                 example: 4
 *     responses:
 *       200:
 *         description: Müsaitlik bilgisi eklendi
 */
router.post("/:id/availability", verifyToken, addAvailability);

module.exports = router;
