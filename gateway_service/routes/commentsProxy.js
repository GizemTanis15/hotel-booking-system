const express = require('express');
const axios = require('axios');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.post('/comments', verifyToken, async (req, res) => {
  const userId = req.userId;
  const { roomId, comment, scores } = req.body;

  try {
    // 🔍 1. Rezervasyon kontrolü
    const { data } = await axios.get('http://localhost:3002/api/v1/bookings/check', {
      params: { userId, roomId }
    });

    if (!data.exists) {
      return res.status(403).json({ message: 'Bu odaya yorum yapamazsınız. Rezervasyon bulunamadı.' });
    }

    // ✅ 2. comments-service’e yönlendir
    const commentResponse = await axios.post('http://localhost:3004/api/v1/comments', {
      roomId,
      comment,
      scores
    }, {
      headers: {
        Authorization: req.headers.authorization
      }
    });

    res.status(commentResponse.status).json(commentResponse.data);

  } catch (error) {
    console.error('Yorum yönlendirme hatası:', error.message);
    res.status(500).json({ message: 'Yorum gönderilemedi.' });
  }
});

module.exports = router;
