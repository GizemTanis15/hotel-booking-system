const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  createBooking,
  getBookingsByUser,
} = require("../controllers/bookingController");

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Rezervasyon işlemleri
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Yeni rezervasyon oluştur
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *                 example: "64fd12abcd1234567890abcd"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-12"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-15"
 *               guestCount:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Rezervasyon oluşturuldu
 */
router.post("/", verifyToken, createBooking);

/**
 * @swagger
 * /api/v1/bookings/my:
 *   get:
 *     summary: Giriş yapan kullanıcının rezervasyonlarını getir
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcıya ait rezervasyonlar listelenir
 */
router.get("/my", verifyToken, getBookingsByUser);

/**
 * @swagger
 * /api/v1/bookings/check:
 *   get:
 *     summary: Kullanıcının belirli bir odaya rezervasyonu var mı kontrol et
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Kullanıcı ID'si
 *       - in: query
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Oda ID'si
 *     responses:
 *       200:
 *         description: Rezervasyon var mı bilgisi
 *         content:
 *           application/json:
 *             example:
 *               exists: true
 */
// routes/bookingRoutes.js  (en alta eklediğin /check route’unda)
const mongoose = require('mongoose');

router.get('/check', async (req, res) => {
  const { userId, roomId } = req.query;
  if (!userId || !roomId) return res.status(400).json({ message: 'userId ve roomId gerekli' });

  const Booking = require('../models/Booking');
  const booking = await Booking.findOne({
    user: new mongoose.Types.ObjectId(userId),   // << string’i ObjectId’e çevir
    roomId
  });

  return res.json({ exists: !!booking });
});

  
module.exports = router;
